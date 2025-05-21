import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Room {
    _id: string;
    name: string;
    slug: string;
}

const AllRooms = () => {
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

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/api/room/${id}`);
            setRooms(rooms.filter((room) => room._id !== id));
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium">All Rooms</h2>
                <Link to="/admin/rooms/create" className="btn-primary">Create Room</Link>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Slug</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <tr key={room._id}>
                                <td className="border px-4 py-2">{room.name}</td>
                                <td className="border px-4 py-2">{room.slug}</td>
                                <td className="border px-4 py-2 flex space-x-4">
                                    <Link to={`/admin/rooms/edit/${room._id}`} className="btn-edit">Edit</Link>
                                    <button onClick={() => handleDelete(room._id)} className="btn-delete">Delete</button>
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

export default AllRooms;
