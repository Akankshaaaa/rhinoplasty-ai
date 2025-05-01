import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenAI, Modality } from '@google/genai';

type ResponseData = {
  success: boolean;
  imageUrl?: string;
  description?: string;
  error?: string;
};

// 1MB in bytes - same as frontend limit
const MAX_FILE_SIZE = 1 * 1024 * 1024;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }
    
    // Calculate base64 size
    const base64SizeInBytes = Buffer.from(imageBase64, 'base64').length;
    
    // Base64 data is typically about 33% larger than the original file
    // This is a simple check to catch very large images
    if (base64SizeInBytes > MAX_FILE_SIZE * 1.5) {
      return res.status(400).json({ 
        success: false, 
        error: 'Image too large. Please upload an image under 1MB in size.'
      });
    }

    // Initialize the API client with a timeout
    const apiKey = process.env.GEMINI_API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });

    // Create a much more precise prompt for rhinoplasty that ensures consistent and realistic results
    const prompt = 
      "Generate a single medical simulation image showing what this person would look like after professional rhinoplasty surgery. " +
      "ABSOLUTELY CRITICAL REQUIREMENTS: " +
      "1. STRICTLY MODIFY ONLY THE NOSE - DO NOT alter any other facial features whatsoever. " +
      "2. PRESERVE EXACTLY: " +
      "   - EYES: Must remain 100% identical in shape, size, and appearance " +
      "   - EYEBROWS: Must remain 100% identical in position, arch, and thickness " +
      "   - LIPS: Must remain 100% identical in shape, size, and position " +
      "   - FACIAL EXPRESSION: Must remain 100% identical (no change in smile, frown, etc.) " +
      "   - LIGHTING, SHADOWS, ANGLE, BACKGROUND: Must remain 100% identical " +
      "3. Create a smaller, refined nose that improves facial harmony. " +
      "4. DO NOT enlarge the nose under any circumstances - rhinoplasty typically reduces nose size. " +
      "5. DO NOT create multiple versions or angles - produce exactly ONE image in the same position as the original. " +
      "6. DO NOT create a side-by-side comparison - modify only the original image. " +
      "7. Use standard rhinoplasty techniques for a natural result: " +
      "   - Refine the nasal bridge (make straighter or smoother) " +
      "   - Reduce any dorsal hump " +
      "   - Refine the nasal tip (make more defined but natural) " +
      "   - Maintain a natural-looking result appropriate for the face " +
      "8. The edited image must be PIXEL-FOR-PIXEL IDENTICAL to the original except for the nose area. " +
      "9. If the nose is already small and well-shaped, make only subtle refinements. " +
      "10. FINAL CHECK: Verify that eyes, eyebrows, lips, and overall facial expression are COMPLETELY UNCHANGED from the original before finalizing the image. " +
      "This is for medical visualization purposes, so accuracy and subtlety are crucial.";

    // Set up request based on updated API format
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: [
        {
          parts: [
            { text: prompt },
            { 
              inlineData: { 
                mimeType: "image/jpeg", 
                data: imageBase64 
              } 
            }
          ]
        }
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    let imageUrl = '';
    let description = '';

    // Process the response according to the new SDK structure
    if (response.candidates && response.candidates.length > 0 && response.candidates[0].content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          description = part.text;
        } else if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    return res.status(200).json({ 
      success: true, 
      imageUrl, 
      description 
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    
    // Try to provide more specific error messages
    let errorMessage = 'Failed to generate rhinoplasty image';
    
    if (error.message?.includes('timeout') || error.message?.includes('timed out')) {
      errorMessage = 'The request timed out. Please try again with a smaller image (under 1MB).';
    } else if (error.message?.includes('too large') || error.message?.includes('size')) {
      errorMessage = 'Image too large. Please upload an image under 1MB in size.';
    }
    
    return res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
} 