import { arrayLCM, lcm, addZero } from './common';
import { compareArray } from './drawChart';

const aryMax = function (a, b) {return Math.max(a, b);}

export function convertToDonscore(chart, courseId) {
	let result = [];
	const course = chart.courses[courseId];
	const branchTypes = ['N','E','M'];
	let spSymbol = 'k';
	
	// Set SpRoll Symbol
	switch (chart.headers.spRoll) {
		case 'denden':
			spSymbol = 'd';
			break;
		case 'suzudon':
			spSymbol = 'b';
			break;
		case 'potato':
			spSymbol = 'p';
			break;
	}
	
	// Create Events Copy
	let newEvent = [];
	for (let measure of course.measures) {
		let tempEvent = [];
		for (let event of measure.events) {
			tempEvent.push({
				name: event.name,
				position: event.position,
				value: event.value,
			});
		}
		newEvent.push(tempEvent);
	}
	
	// Align to 48th
	let newData = [];
	for (let i = 0; i < course.measures.length; i++) {
		const measure = course.measures[i];
		let tempData = {'N':null,'E':null,'M':null};
		
		for (let bt of branchTypes) {
			if (measure.data[bt] === null) {
				continue;
			}
			
			const fixed48th = 48 / measure.length[1] * measure.length[0];
			if (fixed48th > measure.data[bt].length && fixed48th % measure.data[bt].length === 0) {
				tempData[bt] = addZero(measure.data[bt], fixed48th);
			}
			else {
				tempData[bt] = measure.data[bt];
			}
		}
		newData.push(tempData);
	}
	
	// Add for Roll
	for (let bt of branchTypes) {
		let balloonIdx = 0;
		for (let i = 0; i < newData.length; i++) {
			if (newData[i][bt] === null) {
				continue;
			}
			let rolling = false;
			let marginDiff = [];
			let margin = -1;
			let index = -1;
			for (let j = 0; j < newData[i][bt].length; j++) {
				const ch = newData[i][bt].charAt(j);
				
				if (ch === '5' || ch === '6') {
					index = j;
					margin = 1;
					rolling = true;
				}
				else if (ch === '7' || ch === '9') {
					index = j;
					margin = course.headers.balloon[bt][balloonIdx++].toString().length + 2;
					rolling = true;
				}
				else if (ch === '8' && rolling) {
					marginDiff.push(margin - (j - index - 1));
					rolling = false;
				}
			}
			
			if (rolling) {
				marginDiff.push(margin - (newData[i][bt].length - index - 1));
			}
			
			if (marginDiff.length > 0) {
				const marginMax = marginDiff.reduce(aryMax);
				if (marginMax > 0) {
					newData[i][bt] = addZero(newData[i][bt], newData[i][bt].length * (marginMax + 1));
				}
			}
		}
	}
	
	for (let bt of branchTypes) {
		for (let i = 0; i < newData.length; i++) {
			if (newData[i][bt] === null) {
				continue;
			}
			const dataLCM = lcm(newData[i][bt].length, course.measures[i].length[1]);
			if (dataLCM > newData[i][bt].length) {
				newData[i][bt] = addZero(newData[i][bt], dataLCM);
			}
		}
	}
	
	// Fix Events Position
	for (let i = 0; i < course.measures.length; i++) {
		const measure = course.measures[i];
		let lengths = [];
		let firstBranch = '';
		for (let bt of branchTypes) {
			if (newData[i][bt] != null) {
				lengths.push(newData[i][bt].length);
				if (firstBranch === '') {
					firstBranch = bt;
				}
			}
		}
		const fixedMax = arrayLCM(lengths);
		
		for (let j = 0; j < newEvent[i].length; j++) {
			const rate = fixedMax / measure.data[firstBranch].length;
			newEvent[i][j].position = newEvent[i][j].position * rate;
		}
		
		for (let bt of branchTypes) {
			if (newData[i][bt] != null) {
				newData[i][bt] = addZero(newData[i][bt], fixedMax);
			}
		}
	}
	
	// Convert Notes
	let converted = [];
	for (let i = 0; i < newData.length; i++) {
		converted.push({'N':null,'E':null,'M':null});
	}
	for (let bt of branchTypes) {
		let balloonIdx = 0;
		let balloonText = '';
		let endChar = '';
		let balloonTextCount = 0;
		let rolling = false;
		for (let i = 0; i < newData.length; i++) {
			if (newData[i][bt] === null) {
				continue;
			}
			let tempData = [];
			
			for (let j = 0; j < newData[i][bt].length; j++) {
				const ch = newData[i][bt].charAt(j);
				if (rolling && ch != '8') {
					if (balloonTextCount > 0) {
						tempData.push(balloonText.charAt(balloonText.length - balloonTextCount--));
					}
					else {
						tempData.push('=');
					}
					continue;
				}
				
				switch (ch) {
					case '1':
						tempData.push('o');
						break;
					case '2':
						tempData.push('x');
						break;
					case '3':
					case 'A':
						tempData.push('O');
						break;
					case '4':
					case 'B':
						tempData.push('X');
						break;
					case '5':
						tempData.push('<');
						endChar = '>';
						balloonTextCount = 0;
						rolling = true;
						break;
					case '6':
						tempData.push('(');
						endChar = ')';
						balloonTextCount = 0;
						rolling = true;
						break;
					case '7':
						tempData.push('[');
						endChar = ']';
						balloonText = '@' + course.headers.balloon[bt][balloonIdx++].toString();
						balloonTextCount = balloonText.length;
						rolling = true;
						break;
					case '9':
						tempData.push('[');
						endChar = ']';
						balloonText = spSymbol + course.headers.balloon[bt][balloonIdx++].toString();
						balloonTextCount = balloonText.length;
						rolling = true;
						break;
					case '8':
						tempData.push(endChar);
						rolling = false;
						break;
					case 'C':
						tempData.push('B');
						break;
					default:
						tempData.push(' ');
						break;
				}
			}
			
			converted[i][bt] = tempData;
		}
	}
	
	// Fix Roll End
	const rollEndSymbol = ['>',')',']'];
	for (let bt of branchTypes) {
		for (let i = 0; i < converted.length; i++) {
			if (converted[i][bt] === null) {
				continue;
			}
			for (let j = 0; j < converted[i][bt].length; j++) {
				const ch = converted[i][bt][j];
				
				if (rollEndSymbol.includes(ch) && (i > 0 || j > 0)) {
					if (j === 0) {
						converted[i][bt][j] = ' ';
						converted[i - 1][bt][converted[i - 1][bt].length - 1] = ch;
					}
					else {
						converted[i][bt][j] = ' ';
						converted[i][bt][j - 1] = ch;
					}
				}
			}
		}
	}
	
	// Write Donscore
	// Header
	let titleUraSymbol = '(裏譜面)';
	let levelUraSymbol = '裏';
	const fixedTitle = (course.course === 4 && chart.headers.levelUra != 1) ? chart.headers.title + titleUraSymbol : chart.headers.title;
	const difficulty = ['かんたん', 'ふつう', 'むずかしい', 'おに', 'おに' + (chart.headers.levelUra === 1 ? levelUraSymbol : '')];
	
	result.push(`#title ${fixedTitle}`);
	result.push(`#difficulty ${difficulty[course.course]}`);
	result.push(`#level ${course.headers.level}`);
	
	// Chart
	let preBranch = ['N'];
	let preBeatChar = 4;
	let preMeter = [4,4];
	
	for (let m = 0; m < course.measures.length; m++) {
		const measure = course.measures[m];
		
		// Change Branch
		let nowBranch = [];
		for (let bt of branchTypes) {
			if (measure.data[bt] != null) {
				nowBranch.push(bt);
			}
		}
		
		if (!compareArray(preBranch, nowBranch)) {
			let branchText = '#branch ';
			for (let bt of branchTypes) {
				branchText += nowBranch.includes(bt) ? 'o' : 'x';
			}
			result.push(branchText);
		}
		
		// NewLine
		if (measure.properties.ttBreak) {
			result.push('#newline');
		}
		
		// BeatChar
		let nowBeatChar = converted[m][nowBranch[0]].length / measure.length[0];
		if (preBeatChar != nowBeatChar) {
			result.push(`#beatchar ${nowBeatChar}`);
		}
		
		// Meter
		let nowMeter = [measure.length[1], measure.length[0]];
		if (!compareArray(preMeter, nowMeter)) {
			result.push(`#meter ${nowMeter[0]} ${nowMeter[1]}`);
		}
		
		// Events
		for (let i = 0; i < newEvent[m].length; i++) {
			const event = newEvent[m][i];
			const splitNum = converted[m][nowBranch[0]].length / measure.length[0] * (measure.length[1] / 4);
			let eventText = '';
			
			switch (event.name) {
				case 'gogoStart':
					eventText = '#begingogo';
					if (event.position > 0) {
						eventText += ` ${splitNum} ${event.position}`;
					}
					result.push(eventText);
					break;
				case 'gogoEnd':
					eventText = '#endgogo';
					if (event.position > 0) {
						eventText += ` ${splitNum} ${event.position}`;
					}
					result.push(eventText);
					break;
				case 'barlineon':
					eventText = '#barlineon';
					if (event.position > 0) {
						eventText += ` ${splitNum} ${event.position}`;
					}
					result.push(eventText);
					break;
				case 'barlineoff':
					eventText = '#barlineoff';
					if (event.position > 0) {
						eventText += ` ${splitNum} ${event.position}`;
					}
					result.push(eventText);
					break;
				case 'bpm':
					eventText = `#bpm ${event.value}`;
					if (event.position > 0) {
						eventText += ` ${splitNum} ${event.position}`;
					}
					result.push(eventText);
					break;
				case 'scroll':
					let scrollsTemp = [];
					
					for (let bt of branchTypes) {
						if (event.value[bt] === null) {
							continue;
						}
						let duplicate = false;
						for (let j = 0; j < scrollsTemp.length; j++) {
							if (event.value[bt] === scrollsTemp[j].value) {
								scrollsTemp[j].branch.push(bt);
								duplicate = true;
								break;
							}
						}
						if (!duplicate) {
							scrollsTemp.push({value:event.value[bt], branch:[]});
							scrollsTemp[scrollsTemp.length - 1].branch.push(bt);
						}
					}
					
					for (let sTemp of scrollsTemp) {
						let eventText = `#hs ${sTemp.value}`;
						if (event.position > 0) {
							eventText += ` ${splitNum} ${event.position}`;
						}
						if (scrollsTemp.length != 1 || sTemp.branch.length != measure.dataNum) {
							eventText += ' ';
							for (let bt of branchTypes) {
								eventText += sTemp.branch.includes(bt) ? 'o' : 'x';
							}
						}
						result.push(eventText);
					}
					break;
			}
		}
		
		// Notes
		for (let nb of nowBranch) {
			result.push(converted[m][nb].join(''));
		}
		
		preBranch = nowBranch;
		preBeatChar = nowBeatChar;
		preMeter = nowMeter;
	}
	
	console.log(result);
	return result.join('\n');
}