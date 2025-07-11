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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  // Handle opening and closing the modal
  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Close modal on Esc key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="bg-[#f6e6d6] w-full min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png')] opacity-10"></div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-nanum font-bold text-center mb-10 mt-10 text-[#5b3423] tracking-tight">
          Photo Gallery
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-[#ff6666] text-center mb-8 text-lg font-poppins">{error}</p>
        )}

        {/* Gallery Grid */}
        {images.length === 0 && !loading ? (
          <p className="text-center text-[#ffeedc] opacity-80 text-lg font-poppins">
            No images in the gallery yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image._id}
                className="relative group overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`${import.meta.env.VITE_APP_BASE_URL}${image.image}`}
                  alt="Gallery image"
                  className="w-full h-64 object-cover"
                />
                {/* Hover Overlay with View Button */}
                <div className="absolute inset-0 bg-[#5b3423] bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openModal(`${import.meta.env.VITE_APP_BASE_URL}${image.image}`)}
                    className=" text-lg font-poppins opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#ffeedc] text-[#5b3423] px-4 py-2 rounded-full hover:bg-[#e6d7c3] focus:outline-none focus:ring-2 focus:ring-[#ffeedc] focus:ring-opacity-50"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block w-10 h-10 border-4 border-[#ffeedc] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Full-Screen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <img
              src={selectedImage}
              alt="Full-screen gallery image"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-[#ffeedc] text-[#5b3423] p-2 rounded-full hover:bg-[#e6d7c3] focus:outline-none focus:ring-2 focus:ring-[#ffeedc] focus:ring-opacity-50"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
         </section>
  );
};

export default GalleryDisplay;
