import pako from 'pako';

function readPNGChunksFromDataURL(dataURL) {
	const base64Data = dataURL.split(',')[1];

	const binaryData = Buffer.from(base64Data, 'base64');

	const pngHeader = binaryData.slice(0, 8);
	if (pngHeader.toString('hex') !== '89504e470d0a1a0a') {
		throw new Error('Not a valid PNG file');
	}

	let offset = 8;
	const chunks = [];
	while (offset < binaryData.length) {
		const length = binaryData.readUInt32BE(offset);
		const type = binaryData.slice(offset + 4, offset + 8).toString('utf-8');
		const chunkData = binaryData.slice(offset + 8, offset + 8 + length);
		const crc = binaryData.readUInt32BE(offset + 8 + length);

		chunks.push({
			length,
			type,
			data: chunkData,
			crc
		});

		offset += 12 + length;
	}

	return chunks;
}

function insertChunk(chunks, index, type, data) {
	const chunkData = Buffer.from(data, 'binary');
	const length = chunkData.length;
	const chunkType = Buffer.from(type, 'ascii');
	const crc = calculateCRC(Buffer.concat([chunkType, chunkData]));

	chunks.splice(index, 0, {
		length,
		type,
		data: chunkData,
		crc
	});

	return chunks;
}

function calculateCRC(chunkData) {
	let crc = -1 >>> 0;
	for (let i = 0; i < chunkData.length; i++) {
		crc ^= chunkData[i];
		for (let j = 0; j < 8; j++) {
			crc = (crc & 1) ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
		}
	}
	return (crc ^ -1) >>> 0;
}

function createPNGDataURL(chunks) {
	const pngHeader = Buffer.from('89504e470d0a1a0a', 'hex');

	let total = 0;
	let offset = 0;

	for (const chunk of chunks) {
		total += chunk.length + 12;
	}

	let result = Buffer.alloc(total + 8);

	for (const dt of pngHeader) {
		result[offset] = dt;
		offset++;
	}

	for (const chunk of chunks) {
		let lengthBuffer = Buffer.alloc(4);
		lengthBuffer.writeUInt32BE(chunk.data.length, 0);

		const typeBuffer = Buffer.from(chunk.type, 'ascii');

		let crcBuffer = Buffer.alloc(4);
		crcBuffer.writeUInt32BE(chunk.crc, 0);

		for (const dt of lengthBuffer) {
			result[offset] = dt;
			offset++;
		}

		for (const dt of typeBuffer) {
			result[offset] = dt;
			offset++;
		}

		for (const dt of chunk.data) {
			result[offset] = dt;
			offset++;
		}

		for (const dt of crcBuffer) {
			result[offset] = dt;
			offset++;
		}
	}

	const base64Data = result.toString('base64');
	const dataURL = `data:image/png;base64,${base64Data}`;

	return dataURL;
}

export function embedText(data, text) {
	let chunks = readPNGChunksFromDataURL(data);
	chunks = insertChunk(chunks, 1, 'dsCr', Buffer.from(text, 'utf16le'));
	return createPNGDataURL(chunks);
}

export function optimizePNG(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    const chunks = [
        createIHDRChunk(width, height),
        createIDATChunk(data, width, height),
        createIENDChunk()
    ];

    return createPNGDataURL(chunks);
}

function createIHDRChunk(width, height) {
    const chunkData = Buffer.alloc(13);
    chunkData.writeUInt32BE(width, 0);
    chunkData.writeUInt32BE(height, 4);
    chunkData.writeUInt8(8, 8);  // Bit depth
    chunkData.writeUInt8(6, 9);  // Color type (RGBA)
    chunkData.writeUInt8(0, 10); // Compression method
    chunkData.writeUInt8(0, 11); // Filter method
    chunkData.writeUInt8(0, 12); // Interlace method

    return {
        length: 13,
        type: 'IHDR',
        data: chunkData,
        crc: calculateCRC(Buffer.concat([Buffer.from('IHDR'), chunkData]))
    };
}

function createIDATChunk(imageData, width, height) {
    const pixelData = new Uint8Array(width * height * 4 + height);
    let pixelIndex = 0;

    for (let y = 0; y < height; y++) {
        pixelData[pixelIndex++] = 0; // No filter for each scanline
        for (let x = 0; x < width; x++) {
            const dataIndex = (y * width + x) * 4;
            pixelData[pixelIndex++] = imageData[dataIndex];     // R
            pixelData[pixelIndex++] = imageData[dataIndex + 1]; // G
            pixelData[pixelIndex++] = imageData[dataIndex + 2]; // B
            pixelData[pixelIndex++] = imageData[dataIndex + 3]; // A
        }
    }

    const compressedData = pako.deflate(pixelData);
    const chunkData = Buffer.from(compressedData);

    return {
        length: chunkData.length,
        type: 'IDAT',
        data: chunkData,
        crc: calculateCRC(Buffer.concat([Buffer.from('IDAT'), chunkData]))
    };
}

function createIENDChunk() {
    return {
        length: 0,
        type: 'IEND',
        data: Buffer.alloc(0),
        crc: calculateCRC(Buffer.from('IEND'))
    };
}