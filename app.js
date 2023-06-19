const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

const URL = 'https://stablehorde.net/api/v2/interrogate/';
const HEADERS = {
	Accept: '*/*',
	'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
	'Client-Agent': 'StableUI:1.1:(discord)aqualxx#5004',
	Connection: 'keep-alive',
	'Content-Type': 'application/json',
	Origin: 'https://aqualxx.github.io',
	Referer: 'https://aqualxx.github.io/',
	'Sec-Fetch-Dest': 'empty',
	'Sec-Fetch-Mode': 'cors',
	'Sec-Fetch-Site': 'cross-site',
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
	apikey: '(API_KEY)', // StableHorde API Key
	'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
	'sec-ch-ua-mobile': '?0',
	'sec-ch-ua-platform': '"Windows"',
};

class ImageCaptioning {
	constructor(image) {
		this.image = Buffer.from(fs.readFileSync(image)).toString('base64');
	}

	async generate() {
		const body = {
			source_image: this.image,
			forms: [{ name: 'caption' }],
		};

		const response = await fetch(URL + 'async', {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify(body),
		});

		console.log(`StableHorde API response: ${response.status}`);

		if (response.status === 202) {
			const apiResponse = await response.json();
			return await this.getResult(apiResponse.id);
		}
	}

	async getResult(id) {
		let step = 0;
		let apiResponse;

		while (true) {
			const response = await fetch(URL + `status/${id}`, {
				headers: HEADERS,
			});

			apiResponse = await response.json();

			if (apiResponse.state === 'done') {
				break;
			} else {
				step++;
				await new Promise((resolve) => setTimeout(resolve, 2000));
			}
		}

		console.log(`Done in ${step} steps.`);
		const resultObject = apiResponse.forms[0].result;
		const resultString = JSON.stringify(resultObject, null, 2);
		const parsedResult = JSON.parse(resultString);
		return parsedResult;
	}
}

app.get('/', (req, res) => {
	res.json({ message: 'Image Caption StableHorde' });
});

app.post('/upload', upload.single('image'), async (req, res) => {
	try {
		const { path } = req.file;
		const imageCaptioning = new ImageCaptioning(path);
		const result = await imageCaptioning.generate();

		// Remove the uploaded file
		fs.unlinkSync(path);

		res.json(result);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
});


app.listen(3000, () => {
	console.log('Server is running on port 3000');
});