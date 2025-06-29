import axiosInstance from '@services/instance';
import React, { useState, useEffect } from 'react';

interface GalleryImage {
  _id: string;
  image: string;
  createdAt: string;
}

const GalleryComponent: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setLoading(true);
    try {
      await axiosInstance.post('/api/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchImages();
      setIsUploadModalOpen(false);
      setSelectedFile(null);
      setError(null);
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    setLoading(true);
    try {
      await axiosInstance.delete(`/api/gallery/${imageToDelete}`);
      await fetchImages();
      setIsDeleteModalOpen(false);
      setImageToDelete(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Photo Gallery</h1>

      {/* Upload Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition duration-300"
          disabled={loading}
        >
          Upload New Photo
        </button>
      </div>

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
            <div key={image._id} className="relative group">
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}${image.image}`}
                alt="Gallery image"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 rounded-lg transition-opacity duration-300">
                <button
                  onClick={() => { setImageToDelete(image._id); setIsDeleteModalOpen(true); }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Photo</h2>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="mb-4 w-full text-gray-700"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => { setIsUploadModalOpen(false); setSelectedFile(null); }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
            <p className="mb-4 text-gray-600">Are you sure you want to delete this image?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => { setIsDeleteModalOpen(false); setImageToDelete(null); }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
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

export default GalleryComponent;
