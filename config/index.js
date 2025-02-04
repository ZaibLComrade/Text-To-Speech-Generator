const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), ".env") })

const config = {
	api_key: process.env.API_KEY || "",
	api_base_url: process.env.API_BASE_URL || "",
	port: process.env.PORT || 3000,
}

module.exports = config;
