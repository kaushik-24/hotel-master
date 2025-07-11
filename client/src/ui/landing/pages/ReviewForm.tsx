import { useState } from 'react';
import axiosInstance from '@services/instance';

const ReviewForm: React.FC = () => {
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState<number | ''>('');
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Validate input
      if (!authorName || !rating || !text) {
        throw new Error('Please fill in all fields');
      }
      if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }

      const response = await axiosInstance.post('/api/reviews', {
        author_name: authorName,
        rating: Number(rating),
        text,
      });

      console.log('Review submission response:', response.data); // Debug log
      setSuccess('Review submitted successfully!');
      setAuthorName('');
      setRating('');
      setText('');
    } catch (error: any) {
      console.error('Error submitting review:', error);
      setError(error.response?.data?.message || error.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" container mx-auto p-4 font-sans rounded-xl">
      <h1 className="text-2xl font-bold text-[#5b3423] mb-4 text-center">
        Submit Your Review
      </h1>
      {error && (
        <div className="text-center mb-4 text-red-600 font-semibold">
          {error}
        </div>
      )}
      {success && (
        <div className="text-center mb-4 text-[#48bb78] font-semibold">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="authorName" className="block text-[#5b3423] font-medium mb-1">
            Your Name
          </label>
          <input
            id="authorName"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 border border-[#5b3423] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48bb78] bg-white"
            placeholder="Enter your name"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-[#5b3423] font-medium mb-1">
            Rating (1–5)
          </label>
          <input
            id="rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value ? Number(e.target.value) : '')}
            min="1"
            max="5"
            className="w-full p-2 border border-[#5b3423] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48bb78] bg-white"
            placeholder="Enter rating (1–5)"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-[#5b3423] font-medium mb-1">
            Your Review
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-[#5b3423] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48bb78] bg-white"
            placeholder="Write your review"
            rows={4}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-[#ffeedc] text-[#5b3423] font-semibold py-2 text-base border-2 border-[#5b3423] rounded-lg hover:bg-[#5b3423] hover:text-white  transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
