import React from 'react';

interface ResultsDisplayProps {
  originalImage: string | null;
  resultImage: string | null;
  description: string;
  isLoading: boolean;
  onRegenerateClick: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  originalImage,
  resultImage,
  description,
  isLoading,
}) => {
  if (!originalImage) return null;

  return (
    <div className="card mt-8 w-full">
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      
      {isLoading ? (
        <div className="flex flex-col items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Generating rhinoplasty visualization...</p>
          <p className="text-xs text-gray-400 mt-2">This may take a minute or two</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium mb-2">Original</h3>
              <div className="bg-gray-100 rounded-lg p-2 flex-1 flex items-center justify-center">
                {originalImage && (
                  <img
                    src={originalImage}
                    alt="Original"
                    className="max-w-full max-h-64 object-contain rounded"
                  />
                )}
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-lg font-medium mb-2">After Rhinoplasty</h3>
              <div className="bg-gray-100 rounded-lg p-2 flex-1 flex items-center justify-center">
                {resultImage ? (
                  <img
                    src={resultImage}
                    alt="After Rhinoplasty"
                    className="max-w-full max-h-64 object-contain rounded"
                  />
                ) : (
                  <div className="text-center text-gray-500 p-4">
                    No result image generated yet
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {description && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">AI Description</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                {description}
              </div>
            </div>
          )}
          
          {resultImage && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4 text-blue-700 text-sm">
              <p><strong>About this visualization:</strong> The image shows a realistic approximation of potential surgical results. 
              The AI focuses on natural-looking changes based on professional rhinoplasty techniques.</p>
              <p className="mt-2">If you'd like to see a different visualization, please upload a new image.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultsDisplay; 