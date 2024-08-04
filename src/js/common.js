export function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

export function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

export function arrayLCM(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = lcm(result, arr[i]);
    }
    return result;
}

export function addZero(lineStr, max) {
	const addLength = (max - lineStr.length) / lineStr.length;
	if (addLength < 1) {
		return lineStr;
	}

	let newStr = '';
	for (let i = 0; i < lineStr.length; i++) {
		newStr += lineStr.charAt(i);
		newStr += '0'.repeat(addLength)
	}
	
	return newStr;
}

/*
export function convertPngIndexed(dataUrl) {
	const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
	const buffer = Buffer.from(base64Data, 'base64');
	
	let img = sharp(buffer);
	const indexedBuffer = img.png({palette:true}).toBuffer();
	const indexedBase64Data = indexedBuffer.toString('base64');
	const indexedDataUrl = `data:image/png;base64,${indexedBase64Data}`;
	
	return indexedDataUrl;
}
*/