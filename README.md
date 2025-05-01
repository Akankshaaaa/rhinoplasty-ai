# RhinoplastyAI

A web application that uses Google's Gemini Flash Experimental 2.0 model to generate realistic rhinoplasty visualizations from uploaded facial images.

## Features

- Upload a facial image
- Generate realistic rhinoplasty preview
- View before and after comparison
- Responsive design for mobile and desktop

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Google Gemini AI API (using the official @google/genai SDK)

## Prerequisites

- Node.js 18.x or higher
- A Google Gemini API key

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd rhinoplasty-ai
```

### 2. Install dependencies

```bash
# Run the setup script which will:
# - Copy the .env file to .env.local
# - Install all dependencies including the Google GenAI SDK
./setup.sh
```

Or manually:

```bash
npm install
npm install @google/genai@latest
```

### 3. Set up your API key

Create a `.env.local` file in the root directory with your Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

To get a Gemini API key:

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Navigate to the API keys section
4. Create a new API key

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for production

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Usage

1. Open the web application in your browser
2. Upload a clear photo of your face or nose
3. Click the "Generate Rhinoplasty Preview" button
4. View the before and after comparison
5. Read the AI-generated description of the changes

## Image Requirements

For best results:
- **File formats**: JPG or PNG
- **File size**: Maximum 1MB
- **Image quality**: Clear, front-facing photos with good lighting
- **Composition**: Neutral expression where the nose is clearly visible

If your image is larger than 1MB, you'll need to compress it first. You can use tools like:
- [TinyPNG](https://tinypng.com/) for online compression
- [ImageOptim](https://imageoptim.com/) for macOS
- [Paint.NET](https://www.getpaint.net/) or [GIMP](https://www.gimp.org/) for Windows

## About the Gemini API

This application uses Google's Gemini 2.0 Flash Experimental Image Generation model. Key points:

- The model can generate both text and images in response to prompts
- All generated images include a SynthID watermark for authenticity verification
- The API requires setting `responseModalities: [Modality.TEXT, Modality.IMAGE]` to receive both text and image outputs
- The model works best with clear, front-facing images
- There are rate limits and size constraints when using the API

For more information about the Gemini API, visit the [official documentation](https://ai.google.dev/gemini-api/docs/image-generation).

## Important Notes

- The generated images are for visualization purposes only
- Consult with a qualified surgeon before making any decisions
- This application does not provide medical advice
- Actual surgical results may vary from the generated previews

## Limitations

- The quality of the results depends on the input image quality
- The model works best with clear, front-facing images
- Lighting and angle can affect the quality of the generated image
- Large images (>1MB) may cause performance issues or timeouts

## License

MIT
