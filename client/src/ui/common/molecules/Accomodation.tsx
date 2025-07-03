import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@services/instance";

interface MenuProps {
  onClose?: () => void;
}

interface RoomType {
  _id: string;
  name: string;
}

interface HallType {
  _id: string;
  name: string;
}

const Accomodation: React.FC<MenuProps> = ({ onClose }) => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [halls, setHalls] = useState<HallType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get("/api/roomType");
        const roomTypes = response.data.data.roomTypes; // Extract roomTypes array
        if (Array.isArray(roomTypes)) {
          setRooms(roomTypes);
          setError(null);
        } else {
          throw new Error("Unexpected data format: roomTypes is not an array");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch room types");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axiosInstance.get("/api/halls");
        const hallsData = response.data.data;
        if (Array.isArray(hallsData)) {
          setHalls(hallsData);
          setError(null);
        } else {
          throw new Error("Unexpected data format: halls is not an array");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch halls");
      } finally {
        setLoading(false);
      }
    };
    fetchHalls();
  }, []);

  return (
    <>
      <div className="flex flex-1 flex-col gap-y-4 mb-4">
        <p className="uppercase text-[14px] tracking-wider font-poppins hover:underline">
          Accomodation
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {loading ? (
          <p className="font-nanum text-[#5b3423]">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="font-nanum text-[#5b3423]">No rooms found.</p>
        ) : (
          <ul className="font-nanum text-[28px] flex flex-col gap-y-2">
            {rooms.map((room) => (
              <Link
                key={room._id}
                to={`/rooms/${room.name.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={onClose}
              >
                <li className="hover:underline cursor-pointer">{room.name}</li>
              </Link>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-y-4">
        <p className="uppercase text-[14px] tracking-wider font-poppins hover:underline">
          Conference
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {loading ? (
          <p className="font-nanum">Loading halls...</p>
        ) : halls.length === 0 ? (
          <p className="font-nanum">No halls found.</p>
        ) : (
          <ul className="font-nanum text-[28px] flex flex-col gap-y-2">
            {halls.map((hall) => (
              <Link
                key={hall._id}
                to={`/halls/${hall.name.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={onClose}
              >
                <li className="hover:underline cursor-pointer">{hall.name}</li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Accomodation;
