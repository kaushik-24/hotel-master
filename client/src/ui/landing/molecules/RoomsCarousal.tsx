import { rooms } from '@data/rooms';
import axiosInstance from '@services/instance';
import RoomFeatureIcons from '@ui/common/atoms/RoomFeatureIcons';
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
}

const RoomsCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [roomsdb, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch rooms from the backend
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/api/room");
                const roomData = response.data?.data;
                if (Array.isArray(roomData)) {
                    setRooms(roomData);
                } else {
                    console.error("Unexpected data format:", response.data);
                    setRooms([]);
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
                setRooms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    // Use roomsdb consistently, with fallback to rooms if needed
    const currentRooms = roomsdb.length > 0 ? roomsdb : rooms;

    const handlePrev = () => {
        setActiveIndex(prevIndex =>
            prevIndex === 0 ? currentRooms.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex(prevIndex =>
            prevIndex === currentRooms.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToIndex = (index: number) => {
        setActiveIndex(index);
    };

    // Show loading state or handle empty data
    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading rooms...</div>;
    }

    if (currentRooms.length === 0) {
        return <div className="flex justify-center items-center h-64">No rooms available.</div>;
    }

    // Ensure activeIndex is within bounds
    const safeActiveIndex = Math.min(activeIndex, currentRooms.length - 1);
    const currentRoom = currentRooms[safeActiveIndex];

    return (
        <div className="relative flex flex-col justify-center gap-y-10 w-full">
            <div className="flex flex-col md:flex-row px-20 items-center">
                <div className="flex-1">
                    {/* Room Image - use fallback if roomsdb doesn't have image */}
                    <img
                        src={roomsdb.length > 0 ? currentRoom.roomImage || rooms[safeActiveIndex]?.roomImage : rooms[safeActiveIndex]?.roomImage}
                        alt={currentRoom.name}
                        className="w-96 md:w-full h-80 object-cover"
                    />
                </div>

                {/* Room Details */}
                <div className="flex-1 md:ml-20 mt-4">
                    <h2 className="text-[42px] text-[#4f2f1f] font-nanum">{currentRoom.name}</h2>
                    <p className="max-w-[285px] font-poppins text-[17px] mb-5">
                        {roomsdb.length > 0 ? currentRoom.shortdesc: rooms[safeActiveIndex]?.shortdesc}
                    </p>
                    <ul className="grid grid-cols-2 max-w-[300px] gap-y-3 mb-3">
                        {currentRoom.features?.slice(0, 4).map((feature, idx) => (
                            <li key={`${safeActiveIndex}-${idx}-${feature}`} className="flex items-center">
                                <RoomFeatureIcons feature={feature} />
                                <span className="ml-2">{feature}</span>
                            </li>
                        )) || []}
                    </ul>
                    <Link to={roomsdb.length > 0 ? `/room/${currentRoom.name}` : rooms[safeActiveIndex]?.readMore || '#'}>
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
                {currentRooms.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToIndex(idx)}
                        className={`w-3 h-3 rounded-full mx-1 ${safeActiveIndex === idx ? "bg-[#5b3423]" : "border-[1px] border-[#5b3423]"}`}
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
