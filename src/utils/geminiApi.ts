// Function to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the prefix (e.g. data:image/jpeg;base64,)
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

// Function to generate rhinoplasty image using our API endpoint
export const generateRhinoplastyImage = async (
  imageBase64: string
): Promise<{ imageUrl: string; description: string }> => {
  try {
    const response = await fetch('/api/generateRhinoplasty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageBase64 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate rhinoplasty image');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to generate rhinoplasty image');
    }

    return {
      imageUrl: data.imageUrl || '',
      description: data.description || '',
    };
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate rhinoplasty image');
  }
}; 