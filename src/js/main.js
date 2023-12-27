import { Buffer } from 'buffer';

import $ from 'umbrellajs';
import * as d3 from 'd3';

import chardet from 'chardet';
import iconv from 'iconv-lite';

import parseTJA from './parseTJA';
import drawChart from './drawChart';
import analyseChart from './analyseChart';

import '../css/style.scss';
import '../css/Pixel-3x5.css';

//==============================================================================

const $charsetUtf8 = $('#charset-utf-8').first();
const $charsetShiftjis = $('#charset-shift-jis').first();
const $charsetGb18030 = $('#charset-gb18030').first();
const $editorLive = $('#editor-live').first();
const $autoScrollToBottom = $('#auto-scroll-to-bottom').first();
const $editorProcess = $('.editor-process');
const $input = $('.area-editor .input');
const $errors = $('.area-errors .errors');
const $rendaHead = $('.renda-head');

let tjaParsed = null;
let selectedDifficulty = '';
let selectedPage = 'preview';

function displayErrors(message) {
    $errors.text(message);
}

function updateUI() {
    $('.controls-diff .button.is-active').removeClass('is-active');
    $(`.controls-diff .btn-diff-${selectedDifficulty}`).addClass('is-active');

    $('.controls-page .button.is-active').removeClass('is-active');
    $(`.controls-page .btn-page-${selectedPage}`).addClass('is-active');

    $('.area-pages .page').addClass('is-hidden');
    $(`.area-pages .page-${selectedPage}`).removeClass('is-hidden');

    if (selectedPage === 'preview' && selectedDifficulty !== '') showPreview();
    else hidePreview();

    if (selectedPage === 'statistics') showStatistics();
}

function processTJA() {
    try {
        tjaParsed = parseTJA($input.first().value);

        $('.controls-diff .button').addClass('is-hidden');
        for (let diff in tjaParsed.courses) {
            $(`.controls-diff .btn-diff-${diff}`).removeClass('is-hidden');
        }

        displayErrors('No error');
    } catch (e) {
        console.error(e);
        displayErrors(e.message);
    }
}

function showPreview() {
    if (selectedDifficulty === '') return;

    $('#tja-preview').remove();

    document.fonts.load('5px "Pixel 3x5"').then(() => {
        try {
            const $canvas = drawChart(tjaParsed, selectedDifficulty);
            $canvas.id = 'tja-preview';
            $('.page-preview').append($canvas);

            displayErrors('No error');
        } catch (e) {
            console.error(e);
            displayErrors(e.message);
        }
    });
}

function hidePreview() {
    $('#tja-preview').remove();
}

function showStatistics() {
    if (selectedDifficulty === '') return;

    try {
        const data = analyseChart(tjaParsed, selectedDifficulty);
        buildStatisticsPage(data);
    } catch (e) {
        console.error(e);
        displayErrors(e.message);
    }
}

function toFixedZero(num) {
	let newNum = num;
	while (true) {
		if (newNum.charAt(newNum.length - 1) === '0') {
			newNum = newNum.slice(0, -1);
		} else if (newNum.charAt(newNum.length - 1) === '.') {
			newNum = newNum.slice(0, -1);
			break;
		} else {
			break;
		}
	}
    
    return newNum;
}

function buildStatisticsPage(data) {
    const { statistics: stats, graph } = data;

    // Statistics
    $('.stat-total-combo').text(stats.totalCombo);

    const course = tjaParsed.courses[selectedDifficulty];
    const { scoreInit, scoreDiff } = course.headers;

    const drop1 = n => Math.floor(n / 10) * 10;
    const multipliers = [0, 1, 2, 4, 8];
    const noteScores = multipliers.map(m => drop1(scoreInit + scoreDiff * m));
    const noteGogoScores = noteScores.map(s => drop1(s * 1.2));
    const statPotential = (
        noteScores.map((s, i) => stats.score.notes[0][i] * s).reduce((p, c) => p + c, 0) +
        noteGogoScores.map((s, i) => stats.score.notes[1][i] * s).reduce((p, c) => p + c, 0) +
        stats.score.balloon[0] * 300 +
        stats.score.balloon[1] * 360 +
        stats.score.balloonPop[0] * 5000 +
        stats.score.balloonPop[1] * 6000 +
        Math.floor(stats.totalCombo / 100) * 10000
    );

    if (stats.rendas.length) $('.stat-max-score').text(`${statPotential} 点 + 連打`);
    else $('.stat-max-score').text(`${statPotential} 点`);
	
	let bpmMin = 0, bpmMax = 0, firstBpm = true;
	for (let i = 0; i < course.measures.length; i++) {
		for (let j = 0; j < course.measures[i].events.length; j++) {
			if (course.measures[i].events[j].name === 'bpm') {
				let curBpm = course.measures[i].events[j].value;
				
				if (firstBpm) {
					bpmMin = curBpm;
					bpmMax = curBpm;
					firstBpm = false;
				} else {
					if (bpmMin > curBpm) {
						bpmMin = curBpm;
					}
					if (bpmMax < curBpm) {
						bpmMax = curBpm;
					}
				}
			}
		}
	}
	if (bpmMin.toFixed(2) != bpmMax.toFixed(2)) $('.stat-bpm').text(toFixedZero(bpmMin.toFixed(2)) + '-' + toFixedZero(bpmMax.toFixed(2)));
	else $('.stat-bpm').text(toFixedZero(bpmMax.toFixed(2)));
	
    $('.stat-don-small').text(stats.notes[0]);
    $('.stat-don-big').text(stats.notes[2]);
    $('.stat-kat-small').text(stats.notes[1]);
    $('.stat-kat-big').text(stats.notes[3]);

    const statDon = stats.notes[0] + stats.notes[2];
    const statKat = stats.notes[1] + stats.notes[3];
    $('.stat-don').text(statDon);
    $('.stat-kat').text(statKat);

    const statDonRatio = (statDon / stats.totalCombo) * 100;
    const statKatRatio = 100 - statDonRatio;
    $('.stat-don-ratio').text(statDonRatio.toFixed(2) + '%');
    $('.stat-kat-ratio').text(statKatRatio.toFixed(2) + '%');

    $('.stat-density').text(((stats.totalCombo - 1) / stats.length).toFixed(2));
    $('.stat-length').text(stats.length.toFixed(2));

    $('.stat-renda').text(stats.rendas.map(r => r.toFixed(3) + '秒').join(' + '));
    $('.stat-renda-total').text(stats.rendas.reduce((a, b) => a + b, 0).toFixed(3) + '秒');

    $('.stat-balloon').html(stats.balloons.map(b => (
        `${b[1]}打 / ${b[0].toFixed(3)}秒 = ${(b[1] / b[0]).toFixed(3)} 打/秒`
    )).join('<br>'));

    // Graph
    const graphWidth = 600, graphHeight = 200;
    const x = d3.scaleBand().rangeRound([0, graphWidth]);
    const y = d3.scaleLinear().rangeRound([graphHeight, 0]);
    const yMax = Math.ceil(graph.max / 5) * 5;
    const yTickValues = [...Array(yMax / 5 + 1).keys()].map(i => i * 5);

    $('.stat-graph').empty();
    const graphSvg = d3
        .select('.stat-graph')
        .attr('width', graphWidth + 50).attr('height', graphHeight + 40)
        .append('g')
        .attr('transform', 'translate(30, 20)');

    const layers = d3.stack().keys(['don', 'kat'])(graph.data);

    x.domain(layers[0].map((d, idx) => idx));
    y.domain([0, Math.ceil(graph.max / 5) * 5]);

    const makeAxisY = () => d3.axisLeft(y).ticks(5).tickValues(yTickValues);

    graphSvg.append('g')
        .attr('class', 'grid')
        .call(makeAxisY().tickSize(-graphWidth).tickFormat(''));

    const layer = graphSvg
        .selectAll('.layer')
        .data(layers)
        .enter().append('g')
        .attr('class', 'layer')
        .style('fill', (d, i) => ['#f44e', '#44fe'][i]);

    layer
        .selectAll('rect')
        .data(d => d)
        .enter().append('rect')
        .attr('x', (d, idx) => x(idx))
        .attr('y', d => y(d[1]))
        .attr('height', d => y(d[0]) - y(d[1]))
        .attr('width', x.bandwidth);

    graphSvg.append('g')
        .attr('class', 'axis-y')
        .call(makeAxisY());
}

function copyRendaText(rendas, rendaExtends) {
	let result = '', groupCount = 0, groupFirst = true;
	const groupMax = rendaExtends.reduce((a, b) => Math.max(a, b.rendaGroup), -1);
	
	for (let i = 0; i < rendas.length; i++) {
		if (rendaExtends[i].rendaGroup != groupCount) {
			groupCount += 1;
			groupFirst = true;
		}
		
		if (groupFirst) {
			if (rendaExtends[i].isBigRenda) {
				result += 'SIZE(16){';
			}
			
			if (rendaExtends[i].isGoGoRenda) {
				result += '\'\'';
			}
			
			result += '約' + rendas[i].toFixed(3) + '秒'
			
			if (rendaExtends[i].isGoGoRenda) {
				result += '\'\'';
			}
			
			if (rendaExtends[i].isBigRenda) {
				result += '}';
			}
			
			let groupNum = rendaExtends.reduce((a, b) => (b.rendaGroup === groupCount ? a + 1 : a), 0);
			if (groupNum > 1) {
				result += '×' + groupNum;
			}
			
			if (rendaExtends[i].rendaGroup != groupMax) {
				result += '－';
			}
			
			groupFirst = false;
		}
	}
	
	if (rendas.length > 1) {
		result += '： 合計約' + rendas.reduce((a, b) => a + b, 0).toFixed(3) + '秒';
	}
	
	if (result != '') {
		navigator.clipboard.writeText('-連打秒数目安・・・' + result);
	}
}

//==============================================================================

$editorProcess.on('click', () => {
    processTJA();
    showPreview();
});

$rendaHead.on('click', () => {
	if (selectedDifficulty === '') return;
	
    const data = analyseChart(tjaParsed, selectedDifficulty);
	const { statistics: stats, graph } = data;
	copyRendaText(stats.rendas, stats.rendaExtends);
});

$input.on('input', () => {
    if ($editorLive.checked) {
        processTJA();
        updateUI();

        if ($autoScrollToBottom.checked) {
            setTimeout(() => {
                let area_pages = document.getElementById('area-pages');
                area_pages.scrollTo(0, area_pages.scrollHeight);
            }, 100);
        }
    }
});

$input.on('dragover', e => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'cppy';
});

$input.on('drop', dropEvt => {
    dropEvt.stopPropagation();
    dropEvt.preventDefault();

    const file = dropEvt.dataTransfer.files[0];

    const reader = new FileReader();

    reader.onload = readerEvt => {
        const arrayBuffer = readerEvt.target.result;
        const uintArray = new Uint8Array(arrayBuffer);
        const buffer = Buffer.from(uintArray);

        let encoding;
        if ($charsetUtf8.checked) {
            encoding = 'UTF-8';
        } else if ($charsetShiftjis.checked) {
            encoding = 'Shift-JIS';
        } else if ($charsetGb18030.checked) {
            encoding = 'GB18030';
        } else {
            encoding = chardet.detect(buffer);
        }
        const content = iconv.decode(buffer, encoding);

        $input.first().value = content;
        selectedDifficulty = '';

        processTJA();
        updateUI();
    };

    reader.readAsArrayBuffer(file);
});

$('.controls-diff .button').on('click', evt => {
    const diff = $(evt.target).data('value');

    selectedDifficulty = diff;
    updateUI();
});

$('.controls-page .button').on('click', evt => {
    const page = $(evt.target).data('value');

    selectedPage = page;
    updateUI();
});

//==============================================================================

if ($input.first().value) {
    processTJA();
}

updateUI();
