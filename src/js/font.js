export async function loadAllFonts() {
	let ua = window.navigator.userAgent.toLowerCase();
	let fontPromises = []
	//fontPromises.push(document.fonts.load('5px "Pixel 3x5"'));
	
	if(ua.indexOf("windows nt") === -1) {
		fontPromises.push(document.fonts.load('bold 21px "Roboto", "Zen Kaku Gothic New"'));
		fontPromises.push(document.fonts.load('bold 17px "Roboto", "Zen Kaku Gothic New"'));
	}
	
	await Promise.all(fontPromises);
}

export function callFontSetting(headerFont) {
	let result = {
		titleText: '',
		subTitleText: '',
		x1: 8,
		y1: 8,
		x2: 8,
		y2: 40,
		stroke1: false,
		stroke1: false,
	};
	
	if (headerFont === 'sans-serif') {
		result.titleText = 'bold 20px sans-serif';
		result.subTitleText = 'bold 17px sans-serif';
	}
	else {
		let ua = window.navigator.userAgent.toLowerCase();
		if(ua.indexOf("windows nt") === -1) {
			result.titleText = 'bold 21px "Roboto", "Zen Kaku Gothic New"';
			result.subTitleText = 'bold 17px "Roboto", "Zen Kaku Gothic New"';
			result.x1 = 11;
			result.y1 = 10;
			result.x2 = 10;
			result.y2 = 41;
		}else {
			result.titleText = 'bold 21px Arial, MS UI Gothic';
			result.subTitleText = 'bold 17px Arial, MS UI Gothic';
			result.x1 = 11;
			result.y1 = 10;
			result.x2 = 10;
			result.y2 = 41;
		}

	}
	
	return result;
}

export function getUraSymbol(headerFont) {
	let result = {
		title: '(裏譜面)',
		level: '裏',
	}
	
	return result;
}