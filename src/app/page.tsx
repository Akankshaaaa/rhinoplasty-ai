'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import ImageUploader from '../components/ImageUploader';
import ResultsDisplay from '../components/ResultsDisplay';
import { fileToBase64, generateRhinoplastyImage } from '../utils/geminiApi';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState<number>(0);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setResultImageUrl(null);
    setDescription('');
    setError(null);
    setGenerationCount(0);
    setHasGenerated(false);
  };

  const handleGenerateClick = async () => {
    if (!selectedFile) {
      setError('Please upload an image first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Convert image to base64
      const base64String = await fileToBase64(selectedFile);
      
      // Generate rhinoplasty image
      const result = await generateRhinoplastyImage(base64String);
      
      setResultImageUrl(result.imageUrl);
      setDescription(result.description);
      setGenerationCount(prev => prev + 1);
      setHasGenerated(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate rhinoplasty image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Visualize Your Rhinoplasty Results
          </h2>
          <p className="text-gray-600 mb-6">
            Upload a clear photo of your face, and our AI will generate a realistic image showing
            potential rhinoplasty results. Our system creates natural-looking, aesthetically pleasing 
            transformations that could be achieved with real surgery.
          </p>

          <div className="bg-yellow-50 rounded-lg p-4 text-yellow-700 mb-6 text-sm">
            <strong>Best results:</strong> Upload a clear, front-facing photo with good lighting and a neutral expression.
            <p className="mt-2"><strong>Important:</strong> Images must be under 1MB in size. Larger images should be compressed before uploading.</p>
          </div>

          <ImageUploader onImageSelect={handleImageSelect} />

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleGenerateClick}
              disabled={!selectedFile || isLoading || hasGenerated}
              className={`btn ${hasGenerated ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Generating...' : 'Generate Rhinoplasty Preview'}
            </button>
            
            {hasGenerated && (
              <p className="mt-2 text-sm text-gray-600">
                To generate another rhinoplasty preview, please upload a new image.
              </p>
            )}
          </div>

          <ResultsDisplay
            originalImage={originalImageUrl}
            resultImage={resultImageUrl}
            description={description}
            isLoading={isLoading}
            onRegenerateClick={() => {}}
          />
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">About RhinoplastyAI</h2>
          <p className="text-gray-600 mb-3">
            RhinoplastyAI uses Google's Gemini Flash Experimental 2.0 image generation model to 
            create realistic visualizations of potential rhinoplasty results. We focus on generating
            natural-looking changes that mirror what could be achieved through professional surgery.
          </p>
          {/* <p className="text-gray-600 mb-3">
            Our AI has been specifically trained to understand classic rhinoplasty techniques and 
            create previews that consider facial harmony, balance, and proportion - similar to how
            a skilled surgeon would approach your case.
          </p>
          <p className="text-gray-600 mb-3">
            Please note that these are AI-generated previews and actual surgical results may vary.
            Always consult with a qualified surgeon before making any decisions.
          </p>
          <p className="text-gray-600 text-sm">
            This tool is for visualization purposes only and does not provide medical advice.
          </p> */}
        </div>
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} RhinoplastyAI. All rights reserved.</p>
          <p className="mt-1">
            Powered by Google Gemini 2.0 Flash Image Generation API
          </p>
        </div>
      </footer>
    </div>
  );
}
