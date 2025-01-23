const getVoices = async (baseUrl, apiKey) => {
	// Get voice id
	const response = await axios.get(`${baseUrl}/v1/voices`, {
		headers: { Authorization: `Bearer ${apiKey}` },
	});
	const voices = await response.json();
	return voices[0].id || null;
};

module.exports = getVoices;
