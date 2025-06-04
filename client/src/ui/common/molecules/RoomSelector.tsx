import { BookingFormData } from "@interface/booking.interface";
import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface Room {
  _id: string;
  name: string;
  price: number;
  features: string[];
  roomImage: string;
  totalrooms: string;
  heading: string;
  shortdesc: string;
}

interface RoomSelectorProps {
  register: UseFormRegister<BookingFormData>;
  onRoomSelect: (roomId: string, roomName: string) => void;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ register, onRoomSelect }) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
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
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="bg-[#ffeedc] container mx-auto p-2 sm:p-4 font-sans rounded-xl">
      <h1 className="text-lg sm:text-2xl font-bold text-[#5b3423] mb-4 text-center">
        Choose Your Room
      </h1>

      {/* Room Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center mb-5">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="max-w-[240px] w-full rounded-xl overflow-hidden shadow-sm shadow-[#5b3423] border-b-4 border-[#5b3423] m-2 bg-[#ffeedc] transform transition-all duration-300"
          >
            <div className="relative">
              <img
                className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
                src={`${import.meta.env.VITE_APP_BASE_URL}${room.roomImage}`}
                alt={`Image of ${room.heading}`}
              />
              <div className="absolute top-0 right-0 bg-[#5b3423] text-[#ffeedc] text-xs font-semibold px-1.5 py-0.5 rounded-bl-md">
                {room.totalrooms} Rooms
              </div>
            </div>
            <div className="p-3">
              <h2 className="text-lg sm:text-xl font-extrabold mb-1.5 text-[#5b3423] tracking-tight">
                {room.name}
              </h2>
              <p className="text-base sm:text-lg font-bold text-[#5b3423] mb-2 bg-[#f6e6d6] inline-block px-2 py-0.5 rounded-full">
                रू {room.price}/night
              </p>
              <ul className="grid grid-cols-2 gap-1.5 mb-3 text-gray-700 text-xs sm:text-sm">
                {room.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-1.5">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5b3423]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="w-full bg-[#f6e6d6] text-[#5b3423] font-semibold py-1.5 text-sm rounded-lg hover:bg-[#5b3423] hover:text-[#ffeedc] transition-colors duration-200"
                onClick={() => onRoomSelect(room._id, room.name)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSelector;
