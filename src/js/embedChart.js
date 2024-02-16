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
