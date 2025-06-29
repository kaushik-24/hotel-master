import Logo from "@ui/common/molecules/Logo";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Menu from "./sidebar/Menu";
import axiosInstance from "@services/instance";
import { rooms } from '@data/rooms';



interface Room {
    _id: string;
    name: string;
    roomImage: string;
    price: number;
    shortdesc: string;
    features: string[];
}


const RoomNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [roomsdb, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };
    useEffect(() => {
        // Fetch rooms from the backend
        const fetchRooms = async () => {
            try {
                setLoading(true);
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
                setRooms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);
        const currentRooms = roomsdb.length > 0 ? roomsdb : rooms;

    
    // Show loading state or handle empty data
    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading rooms...</div>;
    }

    if (currentRooms.length === 0) {
        return <div className="flex justify-center items-center h-64">No rooms available.</div>;
    }
    
    return (
        <nav className="bg-[#f6e6d6]  px-14 flex justify-between items-center z-100">
            <Logo textColor="text-[#5b3423]" />
            <div className="flex items-center gap-x-8">
                

                <button onClick={toggleMenu} className="text-[#5b3423] cursor-pointer">
                    {isMenuOpen ? null : <AiOutlineMenu size={18} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 flex flex-col items-center bg-split-gradient z-10 overflow-y-auto">
                    <Menu onClose={toggleMenu} />
                </div>
            )}
        </nav>
    )
}

export default RoomNavbar
