import { rooms } from "@data/rooms";
import { IBooking } from "@interface/booking.interface";
import { UseFormRegister } from "react-hook-form";

interface RoomSelectorProps {
    register: UseFormRegister<IBooking>;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ register }) => {
    return (
        <div className="grid grid-cols-4 gap-2">
            {rooms.map((room) => (
                <div key={room.id} className="flex items-center ">
                    <input
                        type="checkbox"
                        id={room.name}
                        value={room.name}
                        {...register("rooms")}
                        className="mr-2"
                    />
                  <div className="grid-rows-4">
                    <img src={room.roomImage} className="w-80 h-full object-cover" />
                    <label htmlFor={room.name} className="text-[#5b3423]">{room.name}</label>
                  </div>
                </div>
            ))}
        </div>
    );
};

export default RoomSelector;
