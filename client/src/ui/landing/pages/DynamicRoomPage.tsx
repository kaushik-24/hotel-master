import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageNotFound from "@ui/common/pages/PageNotFound";
import axiosInstance from "@services/instance";
import RoomHeading from "../atoms/RoomHeading";
import RoomSlogan from "../atoms/RoomSlogan";
import RoomDescription from "../atoms/RoomDescription";

interface RoomData {
  name: string;
  price: number;
  shortdesc: string;
  features: string[];
  roomImage: string;
  capacity: number;
  heading: string;
  longdesc: string;
}

const DynamicRoomPage = () => {
  const { slug } = useParams();
  const [room, setRoom] = useState<RoomData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axiosInstance.get(`/api/roomType/slug/${slug}`);
        setRoom(response.data.data.roomType);
      } catch (err) {
        setNotFound(true);
      }
    };

    fetchRoom();
  }, [slug]);

  if (notFound) return <PageNotFound />;
  if (!room) return <div className="p-4">Loading room...</div>;

  return (
         <div className="flex flex-col bg-[#f6e6d6] text-[#5b3423] justify-center ">
    {/* Hero */}
        <div>
                <RoomHeading headingText={room.name} />
                <RoomSlogan slogan="Culture Meets Comfort" />
                <RoomDescription
                    description={room.shortdesc} />
            </div>

            <div className="bg-[#ffeedc] ">
                <div className="px-5 md:px-20 py-5  ">
                <div className="w-full h-64 md:h-[450px] overflow-hidden rounded-xl shadow-md border-2 border-[#5b3423]">    
                    <img 
                    src={`${import.meta.env.VITE_APP_BASE_URL}${room.roomImage}`} 
                    alt="image of a room" 
                    className="w-full h-full object-cover"
                    />
                </div>
                </div>
            </div>

    {/* Main Content */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left: Description and Features */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">About This Room</h2>
            <p className="text-lg leading-relaxed ">{room.longdesc}</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#5b3421] rounded-full mt-1"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right: Booking Card */}
        <div className="flex">
        <div className="bg-[#f6e6d6] border-l-4 border-b-4 border-[#5b3421] rounded-xl p-6 shadow-md shadow-[#5b3421] sticky top-8 self-start w-full">
          <h3 className="text-xl font-bold mb-3">Reserve Your Stay</h3>
          <p className="mb-2">Room: <span className="font-medium">{room.name}</span></p>
          <p className="mb-2">Suitable for: <span className="font-bold">{room.capacity}</span></p>
          <p className="text-2xl font-bold mb-6">रू {room.price}/night</p>
          <Link to={"/booking"}>
          <button className="w-full border-2 border-[#5b3421] font-semibold py-3 rounded-lg transition
              hover:bg-[#5b3421] hover:text-[#f6e6d6]">
            Book Now
          </button>
          </Link>
        </div>
        </div>
      </div>
    </section>

      </div>
      );
};

export default DynamicRoomPage;

