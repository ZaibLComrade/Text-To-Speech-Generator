const express = require("express");
const axios = require("axios");
const app = express();
const config = require("./config");

app.use(express.json());

app.post("/api", async (req, res) => {
	try {
		const text = req.body.text;
		if (!text) {
			return res.status(400).json({ error: "Text is required" });
		}

		// Replace with your actual Speechify API endpoint and key
		const speechifyResponse = await axios.post(
			`${config.api_base_url}/v1/audio/speech`,
			{
				audio_format: "mp3",
				input: text,
				language: "en-US",
				model: "simba-english",
				voice_id: "henry",
			},
			{
				headers: {
					Authorization: `Bearer ${config.api_key}`,
				},
			}
		);
		const audioBase64 = speechifyResponse.data.audio_data;
		res.setHeader("Content-Type", "audio/mpeg");
		res.setHeader(
			"Content-Disposition",
			'attachment; filename="audio.mp3"'
		);
		res.send(audioBase64);
	} catch (error) {
		console.error("Error processing text:", error);
		res.status(500).json({ error: "Failed to process text" });
	}
});

app.get("/health", (_req, res) => {
	res.send("Server is working");
});

app.listen(config.port, () => {
	console.log(`Server listening on port ${config.port}`);
});
