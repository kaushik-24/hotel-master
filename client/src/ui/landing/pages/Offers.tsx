import axiosInstance from '@services/instance';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Offer {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validFrom: string;
  validTo: string;
  roomType: { _id: string; name: string; slug: string };
  image: string;
}

const Offers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get('/api/offers');
        console.log('Fetched offers:', response.data); // Debug log
        const offerData = response.data.data;
        if (Array.isArray(offerData)) {
          setOffers(offerData);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Invalid data format from server');
          setOffers([]);
        }
      } catch (err: any) {
        console.error('Error fetching offers:', err);
        setError(err.message || 'Failed to fetch offers');
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div className="flex justify-center items-center h-64 bg-[#f6e6d6] text-[#5b3423]">Loading offers...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 bg-[#f6e6d6] text-red-600">{error}</div>;
  }

  if (offers.length === 0) {
    return <div className="flex justify-center items-center h-64 bg-[#f6e6d6] text-[#5b3423]">No offers available.</div>;
  }

  return (
    <div className="flex flex-col bg-[#f6e6d6] text-[#5b3423] min-h-screen">
      {/* Hero */}
      <div className="bg-[#ffeedc] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-nanum font-bold text-[#4f2f1f]">Special Offers</h1>
          <p className="text-lg font-poppins mt-2">Discover our exclusive deals for a memorable stay</p>
        </div>
      </div>

      {/* Offers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="bg-[#ffeedc] border-l-4 border-b-4 border-[#5b3421] rounded-xl p-6 shadow-md shadow-[#5b3421] hover:shadow-lg transition-all duration-200 hover:scale-102"
            >
              <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                <img
                  src={`${import.meta.env.VITE_APP_BASE_URL}${offer.image}`}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/fallback-image.jpg'; // Fallback image
                  }}
                />
              </div>
              <h2 className="text-2xl font-nanum font-bold text-[#4f2f1f] mb-2">{offer.title}</h2>
              <p className="text-sm font-poppins text-[#5b3423] mb-3">{offer.description}</p>
              <p className="text-lg font-poppins font-semibold mb-2">
                Discount: <span className="text-[#4f2f1f]">{offer.discountPercentage}%</span>
              </p>
              <p className="text-sm font-poppins mb-2">
                Valid: {new Date(offer.validFrom).toLocaleDateString()} -{' '}
                {new Date(offer.validTo).toLocaleDateString()}
              </p>
              <p className="text-sm font-poppins mb-4">
                Room Type: <span className="font-medium">{offer.roomType.name}</span>
              </p>
              <Link to={`/booking?offerId=${offer._id}&roomType=${offer.roomType.slug}`}>
                <button
                  className="w-full border-2 border-[#5b3421] font-poppins font-semibold py-3 rounded-lg text-[#5b3423] hover:bg-[#5b3421] hover:text-[#f6e6d6] transition"
                >
                  Book Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Offers;
