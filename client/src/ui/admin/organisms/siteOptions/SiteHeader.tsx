import axiosInstance from '@services/instance';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';



interface HotelLogoResponse {
  path: string;
}

const HotelLogoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch current logo on component mount
  useEffect(() => {
    const fetchCurrentLogo = async () => {
      try {
        const response = await axiosInstance.get<{ success: boolean; data: HotelLogoResponse }>(
          '/api/hotelLogo'
        );
        if (response.data.success) {
          setCurrentLogo(response.data.data.path);
        }
      } catch (error) {
        console.error('Error fetching current logo:', error);
      }
    };
    fetchCurrentLogo();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a logo to upload.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('path', file);

    try {
      const endpoint = currentLogo ? '/api/hotellogo' : '/api/hotellogo';
      const method = currentLogo ? axiosInstance.put : axiosInstance.post;
      const response = await method<{ success: boolean; message: string; data: HotelLogoResponse }>(
        endpoint,
        formData
      );
      setMessage(response.data.message);
      setCurrentLogo(response.data.data.path);
      setFile(null);
      setPreview(null);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || 'Error uploading logo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Hotel Logo</h2>
      {currentLogo && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Current Logo:</p>
          <img
            src={`http://localhost:3000${currentLogo}`}
            alt="Current Logo"
            className="mt-2 max-w-full h-32 object-contain rounded-md"
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hotellogo" className="block text-sm font-medium text-gray-700">
            Select New Logo (JPEG, PNG, GIF)
          </label>
          <input
            type="file"
            id="hotellogo"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {preview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Preview:</p>
            <img src={preview} alt="Logo Preview" className="mt-2 max-w-full h-32 object-contain rounded-md" />
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading || !file}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            isLoading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors duration-200`}
        >
          {isLoading ? 'Uploading...' : currentLogo ? 'Update Logo' : 'Upload Logo'}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default HotelLogoUpload;
