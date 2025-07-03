import axiosInstance from '@services/instance';
import React, { useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

interface Room {
  _id: string;
  name: string;
  roomImage: string;
  price: number;
  shortdesc: string;
  features: string[];
  slug: string;
}

const RoomsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch rooms from the backend
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/api/roomType");
        // Handle both { data: [...] } and { data: { roomTypes: [...] } }
        const roomData = response.data.data.roomTypes || response.data.data;
        console.log('Fetched room types:', roomData); // Debug log
        if (Array.isArray(roomData)) {
          setRooms(roomData);
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Invalid data format from server");
          setRooms([]);
        }
      } catch (error: any) {
        console.error("Error fetching rooms:", error);
        setError(error.message || "Failed to fetch rooms");
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading rooms...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-600">{error}</div>;
  }

  if (rooms.length === 0) {
    return <div className="flex justify-center items-center h-64">No rooms available.</div>;
  }

  // Ensure activeIndex is within bounds
  const safeActiveIndex = Math.min(activeIndex, rooms.length - 1);
  const currentRoom = rooms[safeActiveIndex];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? rooms.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === rooms.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative flex flex-col justify-center gap-y-10 w-full">
      <div className="flex flex-col md:flex-row px-20 items-center">
        <div className="flex-1">
          <img
            src={`${import.meta.env.VITE_APP_BASE_URL}${currentRoom.roomImage}`}
            alt={currentRoom.name}
            className="w-96 md:w-full h-80 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/fallback-image.jpg'; // Fallback image
            }}
          />
        </div>

        {/* Room Details */}
        <div className="flex-1 md:ml-20 mt-4">
          <h2 className="text-[42px] text-[#4f2f1f] font-nanum">{currentRoom.name}</h2>
          <p className="max-w-[285px] font-poppins text-[17px] mb-5">
            {currentRoom.shortdesc}
          </p>
          <ul className="grid grid-cols-2 max-w-[300px] gap-y-3 mb-3">
            {currentRoom.features?.slice(0, 4).map((feature, idx) => (
              <li key={`${safeActiveIndex}-${idx}-${feature}`} className="flex items-center">
                <span className="w-2 h-2 bg-[#5b3421] text-white rounded-full flex items-center justify-center text-sm font-medium"></span>
                <span className="ml-2">{feature}</span>
              </li>
            ))}
          </ul>
          <Link to={`/rooms/${currentRoom.slug}`}>
            <button
              className="uppercase font-poppins tracking-widest border-2 border-[#5b3423] text-[12px] text-[#5b3423] px-3 py-3 
              hover:bg-[#5b3423] hover:text-[#ffeedc]"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      {/* Navigation Circles */}
      <div className="flex justify-center mt-4">
        {rooms.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`w-3 h-3 rounded-full mx-1 ${safeActiveIndex === idx ? 'bg-[#5b3423]' : 'border-[1px] border-[#5b3423]'}`}
          ></button>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#4f2f1f] px-2 py-1"
      >
        <GoChevronLeft size={30} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#4f2f1f] px-2 py-1"
      >
        <GoChevronRight size={30} />
      </button>
    </div>
  );
};

export default RoomsCarousel;
