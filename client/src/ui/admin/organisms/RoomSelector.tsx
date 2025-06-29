import { BookingFormData } from "@interface/booking.interface";
import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface Room {
  _id: string;
  name: string;
  price: number;
  roomImage: string;
  totalrooms: string;
  heading: string;
  shortdesc: string;
}

interface RoomSelectorProps {
  register: UseFormRegister<BookingFormData>;
  onRoomSelect: (roomId: string, roomName: string, roomPrice: number) => void;
}

const AdminRoomSelector: React.FC<RoomSelectorProps> = ({ register, onRoomSelect }) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get("/api/roomType");
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
    <div className=" container mx-auto p-2 sm:p-4 font-sans rounded-xl">
      <h1 className="text-lg sm:text-2xl font-bold  mb-4 text-center">
        Choose Your Room
      </h1>

      {/* Room Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center mb-5">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="max-w-[240px] w-full rounded-xl overflow-hidden shadow-sm  border-b-4  m-2  transform transition-all duration-300"
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
              <h2 className="text-lg sm:text-xl font-extrabold mb-1.5  tracking-tight">
                {room.name}
              </h2>
              <p className="text-base sm:text-lg font-bold  mb-2 bg-[#f6e6d6] inline-block px-2 py-0.5 rounded-full">
                रू {room.price}/night
              </p>
              <ul className="grid grid-cols-2 gap-1.5 mb-3 text-gray-700 text-xs sm:text-sm">
                              </ul>
              <button
                type="button"
                className="w-full bg-[#f6e6d6] text-[#5b3423] font-semibold py-1.5 text-sm rounded-lg hover:bg-[#5b3423] hover:text-[#ffeedc] transition-colors duration-200"
                onClick={() => onRoomSelect(room._id, room.name, room.price)}
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

export default AdminRoomSelector;

