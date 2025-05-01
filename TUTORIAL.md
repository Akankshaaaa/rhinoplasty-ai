# RhinoplastyAI Tutorial

This tutorial guides you through using the RhinoplastyAI application, which leverages Google's Gemini 2.0 Flash Experimental Image Generation model to create realistic visualizations of potential rhinoplasty surgical outcomes.

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- A Google Gemini API key (obtainable from [Google AI Studio](https://ai.google.dev/))
- Basic knowledge of web applications

### Installation

1. Clone the repository and navigate to the project directory
2. Run the setup script:
   ```bash
   ./setup.sh
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Using the Application

1. **Upload an Image**
   - Click the upload area or drag and drop a facial image
   - Best results are achieved with clear, front-facing photos in good lighting
   - Use images with a neutral expression where the nose is clearly visible
   - High-resolution images work better than low-quality ones

2. **Generate the Visualization**
   - Click the "Generate Rhinoplasty Preview" button
   - Wait for the AI to process your image (this may take 30-60 seconds)
   - The system will display both your original image and the AI-generated rhinoplasty result side by side

3. **Interpret the Results**
   - The AI will generate a description of the changes it has made
   - The visualization shows potential surgical outcomes but is not a guarantee of results
   - Use this as a tool for discussion with qualified medical professionals

## Key Features

### Natural Rhinoplasty Visualization
Our application is designed to create realistic previews of potential rhinoplasty results:
- Focused on subtle, aesthetically pleasing changes
- Based on changes that could be achieved with real surgery
- Generated while maintaining the original angle and perspective
- Created with consideration for overall facial harmony

### Professional Surgical Preview
The AI is instructed to focus on:
- Classic rhinoplasty improvements (bridge, tip, nostrils)
- Changes that complement your natural facial structure
- Realistic surgical outcomes, not digital distortions
- Maintaining lighting and other key aspects of the original image

## Understanding the Gemini API Integration

This application uses Google's Gemini 2.0 Flash Experimental Image Generation model, which has several key features:

### Specialized Prompt Engineering

The prompt we use includes specific instructions to:
- Generate a professionally edited, single result image
- Create natural, aesthetically pleasing rhinoplasty results
- Maintain the original angle and perspective
- Consider realistic surgical outcomes
- Focus on classic rhinoplasty improvements
- Enhance overall facial harmony

### Server-Side Processing

To protect your API key, all interactions with the Gemini API happen server-side through our Next.js API endpoint. This ensures:
- Your API key remains secure
- Processing happens away from the client browser
- Response data is formatted consistently before being sent to the frontend

## Troubleshooting

### Image Upload Issues
- Ensure your image is in JPEG or PNG format
- Check that the file size is under 10MB
- Try a different photo if results are unsatisfactory

### Generation Failures
- Check your internet connection
- Verify your API key is correctly set in `.env.local`
- Try using a clearer image with better lighting
- Ensure your API key has not reached its quota limits

### Unexpected Results
- If the rhinoplasty results look unnatural, try uploading a different photo
- Front-facing images typically produce better results than profile views
- If you're not satisfied with the results, you can try again with the same image
- Each generation may produce slightly different results

## Interpreting Results

The AI attempts to create realistic surgical previews, but keep in mind:
- Real surgical results vary based on individual anatomy
- Some subtle changes may be difficult to visualize
- The generated image is an approximation, not a guarantee
- A qualified surgeon can provide more precise expectations

## Resources

- [Google Gemini API Documentation](https://ai.google.dev/gemini-api/docs/image-generation)
- [Prompt Engineering Guidelines](https://ai.google.dev/gemini-api/docs/prompting)
- [Next.js Documentation](https://nextjs.org/docs)

## Legal and Ethical Considerations

Remember that this tool is for visualization purposes only. The generated images:
- Are not medical advice
- Do not represent guaranteed surgical outcomes
- Should be used only as a discussion aid with qualified medical professionals
- Should never be the sole basis for making medical decisions

Always consult with a board-certified plastic surgeon before considering any cosmetic procedure. 