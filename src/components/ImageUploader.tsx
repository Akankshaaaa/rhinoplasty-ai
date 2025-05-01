import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

// 1MB in bytes
const MAX_FILE_SIZE = 1 * 1024 * 1024;

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileSizeError, setFileSizeError] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Reset error states
    setFileError(null);
    setFileSizeError(false);
    
    // Check for rejected files due to type
    if (rejectedFiles.length > 0) {
      // Check if it was rejected due to size
      const sizeRejection = rejectedFiles[0]?.errors?.some(
        (error: any) => error.code === 'file-too-large'
      );
      
      if (sizeRejection) {
        const fileSize = rejectedFiles[0]?.file?.size || 0;
        const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
        setFileError(`File size too large (${fileSizeMB}MB). Please compress your image to under 1MB.`);
        setFileSizeError(true);
      } else {
        setFileError('Please upload a valid JPG or PNG image.');
      }
      return;
    }
    
    const file = acceptedFiles[0];
    if (file) {
      // Double-check file size (belt and suspenders approach)
      if (file.size > MAX_FILE_SIZE) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        setFileError(`File size too large (${fileSizeMB}MB). Please compress your image to under 1MB.`);
        setFileSizeError(true);
        return;
      }
      
      onImageSelect(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': []
    },
    maxFiles: 1,
    multiple: false,
    maxSize: MAX_FILE_SIZE
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-blue-50' : fileError ? 'border-red-300 hover:border-red-400' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 max-w-full object-contain mb-4 rounded"
            />
            <p className="text-sm text-gray-500">Click or drag to replace image</p>
          </div>
        ) : (
          <div className="py-10">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              {isDragActive
                ? "Drop your image here..."
                : "Drag & drop a facial image here, or click to select"}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Supported formats: JPG, PNG (max 1MB)
            </p>
          </div>
        )}
      </div>
      
      {fileError && (
        <div className="mt-2 p-3 bg-red-50 rounded-md border border-red-100 text-red-600">
          <p>{fileError}</p>
          {fileSizeError && (
            <div className="mt-2 bg-white p-3 rounded border border-blue-100">
              <p className="font-semibold text-blue-700">Image Compression Tools:</p>
              <ul className="mt-1 list-disc list-inside">
                <li>
                  <a 
                    href="https://tinypng.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-medium"
                  >
                    TinyPNG
                  </a> - Free online image compression
                </li>
                <li>
                  <a 
                    href="https://squoosh.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-medium"
                  >
                    Squoosh
                  </a> - Browser-based image compression
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 