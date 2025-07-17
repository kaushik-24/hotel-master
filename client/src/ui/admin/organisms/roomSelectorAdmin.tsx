import { BookingFormData } from "@interface/booking.interface";
import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface RoomType {
  _id: string;
  name: string;
  price: number;
  roomImage: string;
  shortdesc: string;
  discount: number;
  discountedPrice: number | 0;
  availableRooms: number;
}

interface RoomSelectorProps {
  register: UseFormRegister<BookingFormData>;
  onRoomSelect: (roomTypeId: string, roomTypeName: string, roomPrice: number) => void;
}

const RoomSelectorAdmin: React.FC<RoomSelectorProps> = ({ register, onRoomSelect }) => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomTypes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/roomType");
        const { roomTypes } = response.data.data;
        console.log("Room types response:", response.data.data); // Debug log
        if (Array.isArray(roomTypes)) {
          setRoomTypes(roomTypes);
          setError(null);
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Failed to load room types: Unexpected data format");
          setRoomTypes([]);
        }
      } catch (error: any) {
        console.error("Error fetching room types:", error);
        setError(error.response?.data?.message || "Failed to load room types");
        setRoomTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, []);

  return (
    <div className=" container mx-auto  p-2 sm:p-4 font-sans rounded-xl">
      <button
            onClick={() => navigate('/admin/manage-booking')}
            className="flex items-center text-gray-600 hover:text-[#019cec]"
          >
            <FaArrowLeft className="mr-1" /> Back to List
          </button>

      <h1 className="text-lg sm:text-2xl font-bold text-[#5b3423] mb-4 text-center">
        Choose Your Room Type
      </h1>
      {error && (
        <div className="text-center mb-4 text-red-600 font-semibold">
          {error}
        </div>
      )}
      {loading ? (
        <div className="text-center mb-4 text-[#5b3423] font-semibold">
          Loading room types...
        </div>
      ) : roomTypes.length === 0 ? (
        <div className="text-center mb-4 text-[#5b3423] font-semibold">
          No room types available.
        </div>
      ) : !roomTypes.some(rt => rt.discount > 0) ? (
        <div className="text-center mb-4 text-[#5b3423] font-semibold">
          No discounts available at this time.
        </div>
      ) : (
        <div className="text-center mb-4 text-[#ff6b6b] font-semibold">
          Special Offer: Up to 30% off on select room types!
        </div>
      )}

      {/* room card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center mb-6">
        {roomTypes.map((roomType) => {
          // Truncate shortdesc to 100 characters with ellipsis
        const truncateDesc = (desc: string, maxLength = 50) => {
            if (desc.length <= maxLength) return desc;
            return desc.substring(0, maxLength - 3) + '...';
          };

          return (
            <div
              key={roomType._id}
              className="max-w-[260px] w-full rounded-2xl overflow-hidden shadow-md shadow-[#5b3423]/50 border-b-4 border-[#5b3423] m-3  transform transition-all duration-300  hover:shadow-lg flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                  src={`${import.meta.env.VITE_APP_BASE_URL}${roomType.roomImage || '/default-image.jpg'}`}
                  alt={`Image of ${roomType.name}`}
                />
                
              </div>
              <div className="p-4 flex flex-col min-h-[180px] flex-grow">
                <h2 className="text-xl sm:text-2xl font-extrabold mb-2 text-[#5b3423] tracking-tight">
                  {roomType.name}
                </h2>
                <div className="mb-3 text-base sm:text-lg font-semibold text-[#5b3423]">
                  {roomType.discount > 0 ? (
                    <div className="flex items-center gap-2  px-3 py-1 rounded-full ">


                      <span className="line-through text-sm text-gray-600">रू {roomType.price}/night</span>
                      <div className="">
                      <span className="text-[#ff6b6b] font-bold">रू {roomType.discountedPrice.toFixed(2)}/night</span>
                      <span className="text-xs text-[#ff6b6b] font-medium">  ({roomType.discount}% off)</span>
                      </div>
                    </div>
                  ) : (
                    <span className=" px-3 py-1 rounded-full inline-block">
                      रू {roomType.price}/night
                    </span>
                  )}
                </div>
                <ul className="grid gap-2 mb-4 text-gray-700 text-sm sm:text-base flex-grow">
                  <li title={roomType.shortdesc}>{truncateDesc(roomType.shortdesc)}</li>
                </ul>
                <button
                  type="button"
                  className={`w-full font-semibold py-2 text-base border-2 border-[#5b3423] rounded-lg hover:bg-blue-700 hover:text-white  transition-colors duration-200 ${roomType.availableRooms === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => onRoomSelect(roomType._id, roomType.name, roomType.discountedPrice || roomType.price)}
                  disabled={roomType.availableRooms === 0}
                >
                  {roomType.availableRooms > 0 ? "Book Now" : "Sorry Booked!!"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomSelectorAdmin;

