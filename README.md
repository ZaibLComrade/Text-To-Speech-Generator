# Text-To-Speech-Generator

## **Project Overview**

The Text-to-Speech API is a Node.js-based server that converts text input into an audio file using the Speechify API. The server processes the input text and returns an MP3 file encoded as a Base64 string. Users can send HTTP POST requests to the API endpoint with the desired text and receive the generated speech as an audio file.

---

## **Project Features**

1. **Text-to-Speech Conversion**: Converts input text into an MP3 audio file.
2. **Speechify Integration**: Leverages the Speechify API for high-quality speech synthesis.
3. **Base64 Response**: Returns the audio in Base64-encoded MP3 format.
4. **Download Support**: Allows users to decode and save the audio locally.

---

## **How to Use**

### **API Endpoint**

-   **URL**: `https://text-to-speech-server-ashen.vercel.app/api`
-   **Method**: `POST`
-   **Content-Type**: `application/json`

### **Request Format**

The request body must include a `text` property with the string to be converted to speech.

Example cURL request:

```bash
curl -X POST https://text-to-speech-server-ashen.vercel.app/api \
-H "Content-Type: application/json" \
-d '{
  "text": "This is some random text generated for the request."
}'
```

### **Response**

The server returns the Base64-encoded MP3 audio file. This string can be decoded and saved as an audio file.

---

## **Steps to Decode and Save Audio**

### **1. Decode Base64 and Save as File (Linux/Mac)**

Run the following command to decode the Base64 response and save it as an MP3 file:

```bash
curl -X POST https://text-to-speech-server-ashen.vercel.app/api \
-H "Content-Type: application/json" \
-d '{
  "text": "This is some random text generated for the request."
}' | base64 -d > output.mp3
```

### **2. Decode Base64 and Save as File (Windows)**

1. Save the Base64 string response to a file (e.g., `response.txt`).
2. Use PowerShell to decode and save it:
    ```powershell
    [IO.File]::WriteAllBytes("output.mp3", [Convert]::FromBase64String((Get-Content -Raw -Path "response.txt")))
    ```

---

## **Health Check Endpoint**

To verify that the server is running:

-   **URL**: `https://text-to-speech-server-ashen.vercel.app/health`
-   **Method**: `GET`

Example cURL request:

```bash
curl -X GET https://text-to-speech-server-ashen.vercel.app/health
```

Response:

```
Server is working
```

---

## **Error Handling**

### **Common Errors**

-   **400 Bad Request**: Returned if the `text` field is missing in the request body.
    ```json
    {
    	"error": "Text is required"
    }
    ```
-   **500 Internal Server Error**: Returned if the server encounters an issue processing the request.
    ```json
    {
    	"error": "Failed to process text"
    }
    ```

### **Debugging Tips**

-   Ensure the `text` field is present in the request body.
-   Verify the Speechify API credentials in `.env` are correct.

---

## **Development Setup**

### **1. Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/ZaibLComrade/Text-To-Speech-Generator.git
cd text-to-speech-api
```

### **2. Install Dependencies**

Install the required dependencies:

```bash
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root directory of the project and add the following variables:

```
API_BASE_URL=https://api.speechify.com
API_KEY=your-speechify-api-key
PORT=3000
```

### **4. Start the Server**

Start the server with the following command:

```bash
node server.js
```

The server will start on the port specified in the `.env` file (default: 3000).

### **5. Access the API**

Access the API at `http://localhost:3000/api`.

---
