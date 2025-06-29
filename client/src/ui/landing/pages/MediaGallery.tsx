import React, { useState, useEffect } from 'react';
import axiosInstance from '@services/instance';

interface GalleryImage {
  _id: string;
  image: string;
  createdAt: string;
}

const GalleryDisplay: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all gallery images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/gallery');
      setImages(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#5b3423]">Photo Gallery</h1>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {/* Gallery Grid */}
      {images.length === 0 && !loading ? (
        <p className="text-center text-gray-500">No images in the gallery yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image._id} className="relative">
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}${image.image}`}
                alt="Gallery image"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center mt-4">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default GalleryDisplay;
