import { rooms } from "@data/rooms";
import RoomFeatureIcons from "@ui/common/atoms/RoomFeatureIcons";

interface RoomFacilitiesProps {
    roomName: string;
}

const RoomFacilities: React.FC<RoomFacilitiesProps> = ({ roomName }) => {

    const room = rooms.find(room => room.name === roomName);

    return (
        <div className="flex flex-col md:flex-row gap-x-10 px-10 bg-[#f6e6d6] w-full py-20">
            <div className="flex w-[60%]">

                <img src={room?.roomImage} alt={room?.name} />

            </div>

            <div className="flex flex-col w-[40%] gap-y-5">
                <h1 className="flex w-full font-nanum text-[#5b3423] mt-[90px] text-[55px] md:text-[66px]">Facilities</h1>
                <p className="font-poppins text-[17px] max-w-[390px]">Enjoy our {room?.name} and its complimentary offerings.</p>

                {/* Map the selected room features */}
                <ul className="grid grid-cols-2 max-w-[400px] gap-y-3 mb-3 px-5">
                    {room?.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-x-1">
                            <RoomFeatureIcons feature={feature} />
                            {/* Changed from <li> to <span> to avoid nested <li> */}
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <button className="uppercase font-poppins text-[12px] text-[#4F2F1F] border-2 border-[#4f2f1f] px-3 py-2 hover:bg-[#4f2f1f] hover:text-[#fffcf1] max-w-[123px] mt-5">
                    book now
                </button>
            </div>
        </div>
    );
};

export default RoomFacilities;
