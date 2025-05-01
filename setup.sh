#!/bin/bash

# Create .env.local file from .env
echo "Creating .env.local from .env..."
cp ../.env .env.local

# Install dependencies
echo "Installing dependencies..."
npm install

# Install specific Google AI SDK version if needed
echo "Installing Google GenAI SDK..."
npm install @google/genai

echo "Setup complete! You can now run 'npm run dev' to start the development server." 