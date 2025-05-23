import { BookingFormData } from "@interface/booking.interface";
import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface RoomSelectorProps {
    register: UseFormRegister<BookingFormData>;
}

interface Room {
    _id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ register }) => {
     const [rooms, setRooms] = useState<Room[]>([]);
      useEffect(() => {
        // Fetch rooms from the backend
        const fetchRooms = async () => {
            try {
                const response = await axiosInstance.get("/api/room");
                const roomData = response.data?.data; // Access the nested `data` field
                if (Array.isArray(roomData)) {
                    setRooms(roomData); // Set rooms from the `data` array
                } else {
                    console.error("Unexpected data format:", response.data);
                    setRooms([]); // Fallback in case the response is not an array
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);
    return (
        <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {rooms.map((room) => (
                <div key={room._id} className="flex items-center ">
                    <input
                        type="checkbox"
                        id={room.name}
                        value={room.name}
                        {...register("rooms")}
                        className="mr-2"
                    />
                  <div className="grid-rows-4">
                    <label htmlFor={room.name} className="text-[#5b3423]">{room.name}</label>
                    <p className="text-[#5b3423]">रू {room.price}</p>
                  </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default RoomSelector;
