import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { FaEdit, FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Room {
    _id: string;
    slug: string;
    name: string;
    capacity: number;
    price: number;
    shortdesc: string;
    features: string[];
}

const AllRoomTypes = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        // Fetch rooms from the backend
        const fetchRooms = async () => {
            try {
                const response = await axiosInstance.get("/api/roomType");
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

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/api/roomType/${id}`);
            setRooms(rooms.filter((room) => room._id !== id));
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium">Room Types</h2>
                <Link to="/admin/roomType/create">
                <button
                    className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >Create Room Type
            </button></Link>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Capacity</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <tr key={room._id}>
                                <td className="border px-4 py-2">{room.name}</td>
                                <td className="border px-4 py-2">{room.price}</td>
                                <td className="border px-4 py-2">{room.capacity}</td>
                                <td className="border px-4 py-2 flex space-x-4">
                                    <Link to={`/admin/roomType/edit/${room._id}`} className="btn-edit text-blue-600 hover:text-blue-800">
                                      <FaEdit />
                                    </Link>
                                    <button onClick={() => handleDelete(room._id)} className="btn-delete text-red-600 hover:text-red-800">
                                      <FaTrash />
                                    </button>
                                    <Link to={`/rooms/${room.slug}`} 
                                    className="text-blue-600 hover:text-blue-800"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    > <FaExternalLinkAlt /></Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4">No rooms found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllRoomTypes;
