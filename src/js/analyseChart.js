function pulseToTime(events, objects) {
    let bpm = 120;
    let passedBeat = 0, passedTime = 0;
    let eidx = 0, oidx = 0;

    let times = [];

    while (oidx < objects.length) {
        let event = events[eidx], objBeat = objects[oidx];

        while (event && event.beat <= objBeat) {
            if (event.type === 'bpm') {
                let beat = event.beat - passedBeat;
                let time = 60 / bpm * beat;

                passedBeat += beat;
                passedTime += time;
                bpm = event.value;
            }

            eidx++;
            event = events[eidx];
        }

        let beat = objBeat - passedBeat;
        let time = 60 / bpm * beat;
        times.push(passedTime + time);

        passedBeat += beat;
        passedTime += time;
        oidx++;
    }

    return times;
}

function convertToTimed(course) {
    const events = [], notes = [];
    let beat = 0, balloon = 0, imo = false;

    for (let m = 0; m < course.measures.length; m++) {
        const measure = course.measures[m];
        const length = measure.length[0] / measure.length[1] * 4;

        for (let e = 0; e < measure.events.length; e++) {
            const event = measure.events[e];
            const eBeat = length / (measure.data.length || 1) * event.position;

            if (event.name === 'bpm') {
                events.push({
                    type: 'bpm',
                    value: event.value,
                    beat: beat + eBeat,
                });
            }
            else if (event.name === 'gogoStart') {
                events.push({
                    type: 'gogoStart',
                    beat: beat + eBeat,
                });
            }
            else if (event.name === 'gogoEnd') {
                events.push({
                    type: 'gogoEnd',
                    beat: beat + eBeat,
                });
            }
        }

        for (let d = 0; d < measure.data.length; d++) {
            const ch = measure.data.charAt(d);
            const nBeat = length / measure.data.length * d;

            let note = { type: '', beat: beat + nBeat };

            switch (ch) {
                case '1':
                    note.type = 'don';
                    break;

                case '2':
                    note.type = 'kat';
                    break;

                case '3':
                case 'A':
                    note.type = 'donBig';
                    break;

                case '4':
                case 'B':
                    note.type = 'katBig';
                    break;

                case '5':
                    note.type = 'renda';
                    break;

                case '6':
                    note.type = 'rendaBig';
                    break;

                case '7':
                    note.type = 'balloon';
                    note.count = course.headers.balloon[balloon++];
                    break;

                case '8':
                    note.type = 'end';
                    if (imo) imo = false;
                    break;

                case '9':
                    if (imo === false) {
                        note.type = 'balloon';
                        note.count = course.headers.balloon[balloon++];
                        imo = true;
                    }
                    break;
            }

            if (note.type) notes.push(note);
        }

        beat += length;
    }

    const times = pulseToTime(events, notes.map(n => n.beat));
    times.forEach((t, idx) => { notes[idx].time = t; });

    return { headers: course.headers, events, notes };
}

function getStatistics(course) {
    // total combo, don-kat ratio, average notes per second
    // renda length, balloon speed
    // potential score, score equations, recommended score variables

    const notes = [0, 0, 0, 0], rendas = [], rendaExtends = [], balloons = [];
    let start = 0, end = 0, combo = 0;
    let rendaStart = false, rendaStartTime = 0, balloonStart = false, balloonStartTime = 0, balloonCount = 0, balloonGogo = 0;
	let isBigRenda = false, isGoGoRenda = false, rendaGroup = 0;
    let scCurEventIdx = 0, scCurEvent = course.events[scCurEventIdx];
    let scGogo = 0;
    let scNotes = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    let scBalloon = [0, 0], scBalloonPop = [0, 0];
    let scPotential = 0;

    const typeNote = ['don', 'kat', 'donBig', 'katBig'];

    for (let i = 0; i < course.notes.length; i++) {
        const note = course.notes[i];

        if (scCurEvent && scCurEvent.beat <= note.beat) {
            do {
                if (scCurEvent.type === 'gogoStart') scGogo = 1;
                else if (scCurEvent.type === 'gogoEnd') scGogo = 0;

                scCurEventIdx += 1;
                scCurEvent = course.events[scCurEventIdx];
            } while (scCurEvent && scCurEvent.beat <= note.beat);
        }

        const v1 = typeNote.indexOf(note.type);
        if (v1 !== -1) {
            if (i === 0) start = note.time;
            end = note.time;

            notes[v1] += 1;
            combo += 1;

            const big = v1 === 2 || v1 === 3;
            const scRange = (combo < 10 ? 0 : (combo < 30 ? 1 : (combo < 50 ? 2 : (combo < 100 ? 3 : 4))));
            scNotes[scGogo][scRange] += big ? 2 : 1;

            let noteScoreBase = (
                course.headers.scoreInit +
                (course.headers.scoreDiff * (combo < 10 ? 0 : (combo < 30 ? 1 : (combo < 50 ? 2 : (combo < 100 ? 4 : 8)))))
            );

            let noteScore = Math.floor(noteScoreBase / 10) * 10;
            if (scGogo) noteScore = Math.floor(noteScore * 1.2 / 10) * 10;
            if (big) noteScore *= 2;

            scPotential += noteScore;

            // console.log(i, combo, noteScoreBase, scGogo, big, noteScore, noteScore, scPotential);

            continue;
        }

        if (note.type === 'renda' || note.type === 'rendaBig') {
            rendaStartTime = note.time;
			rendaStart = true;
			isBigRenda = note.type === 'rendaBig' ? 1 : 0;
			isGoGoRenda = scGogo;
            continue;
        }
        else if (note.type === 'balloon') {
            balloonStartTime = note.time;
			balloonStart = true;
            balloonCount = note.count;
            balloonGogo = scGogo;

            continue;
        }
        else if (note.type === 'end') {
            if (rendaStart) {
                rendas.push(note.time - rendaStartTime);
				
				if (rendaExtends.length > 0) {
					if (rendaExtends[rendaExtends.length - 1].isBigRenda != isBigRenda ||
						rendaExtends[rendaExtends.length - 1].isGoGoRenda != isGoGoRenda ||
						rendas[rendaExtends.length - 1].toFixed(3) != (note.time - rendaStartTime).toFixed(3)) {
						rendaGroup += 1;
					}
				}
				rendaExtends.push({
					isBigRenda: isBigRenda,
					isGoGoRenda: isGoGoRenda,
					rendaGroup: rendaGroup
				});
                rendaStart = false;
            }
            else if (balloonStart) {
                const balloonLength = note.time - balloonStartTime;
                const balloonSpeed = balloonCount / balloonLength;
                balloons.push([balloonLength, balloonCount]);
                balloonStart = false;

                if (balloonSpeed <= 60) {
                    scBalloon[balloonGogo] += balloonCount - 1;
                    scBalloonPop[balloonGogo] += 1;
                }
            }
        }
    }
	
    return {
        totalCombo: combo,
        notes: notes,
        length: end - start,
        rendas: rendas,
		rendaExtends: rendaExtends,
        balloons: balloons,
        score: {
            score: scPotential,
            notes: scNotes,
            balloon: scBalloon,
            balloonPop: scBalloonPop,
        },
    };
}

function getGraph(course) {
    const data = [];
    let datum = { don: 0, kat: 0 }, max = 0;

    const dataCount = 100,
        length = course.notes[course.notes.length - 1].time,
        timeframe = length / dataCount;

    const typeNote = ['don', 'kat', 'donBig', 'katBig'];

    for (let i = 0; i < course.notes.length; i++) {
        const note = course.notes[i];

        const v1 = typeNote.indexOf(note.type);
        if (v1 !== -1) {
            while ((data.length + 1) * timeframe <= note.time) {
                const sum = datum.don + datum.kat;
                if (max < sum) max = sum;

                data.push(datum);
                datum = { don: 0, kat: 0 };
            }

            if (note.type === 'don' || note.type === 'donBig') datum.don += 1;
            else if (note.type === 'kat' || note.type === 'katBig') datum.kat += 1;
        }
    }

    while (data.length < dataCount)
        data.push({ don: 0, kat: 0 });

    return { timeframe, max, data };
}

export default function (chart, courseId) {
    const course = chart.courses[courseId];
    const converted = convertToTimed(course);

    const statistics = getStatistics(converted);
    const graph = getGraph(converted);

    return { statistics, graph };
}
