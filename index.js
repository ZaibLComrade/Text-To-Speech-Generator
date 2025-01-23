const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());
const API_BASE_URL = "https://api.sws.speechify.com";
const API_KEY = "A6Cv6bKJ9nsjfMP13ocDREXzL1F7OONRqCfTy3SECJ4=";

let audioBase64 = null;

app.post("/text", async (req, res) => {
	try {
		const text = req.body.text;
		if (!text) {
			return res.status(400).json({ error: "Text is required" });
		}

		// Replace with your actual Speechify API endpoint and key
		const speechifyResponse = await axios.post(
			`${API_BASE_URL}/v1/audio/speech`,
			{
				audio_format: "mp3",
				input: text,
				language: "en-US",
				model: "simba-english",
				voice_id: "henry",
			},
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
				},
			}
		);
		const audioBase64 = speechifyResponse.data.audio_data
		console.log(audioBase64);
		res.setHeader("Content-Type", "audio/mp3"); 
		res.send(audioBase64);
	} catch (error) {
		console.error("Error processing text:", error);
		res.status(500).json({ error: "Failed to process text" });
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
