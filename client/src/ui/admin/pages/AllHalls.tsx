import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface Hall {
    _id: string;
    slug: string;
    name: string;
    capacity: number;
    price: number;
    shortdesc: string;
    features: string[];
}

const AllHalls = () => {
    const [halls, setHalls] = useState<Hall[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch halls from the backend
        const fetchHalls = async () => {
            try {
                const response = await axiosInstance.get("/api/halls");
                const hallData = response.data?.data; // Access the nested `data` field
                if (Array.isArray(hallData)) {
                    setHalls(hallData); // Set halls from the `data` array
                } else {
                    console.error("Unexpected data format:", response.data);
                    setHalls([]); // Fallback in case the response is not an array
                }
            } catch (error) {
                console.error("Error fetching halls:", error);
            }
        };

        fetchHalls();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/api/halls/${id}`);
            setHalls(halls.filter((hall) => hall._id !== id));
        } catch (error) {
            console.error("Error deleting hall:", error);
        }
    };

    return (
        <>
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium">Hall Types</h2>
                <Link to="/admin/hotel/halls/create">
                <button
                    className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >Create Hall Type
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
                    {halls.length > 0 ? (
                        halls.map((hall) => (
                            <tr key={hall._id}>
                                <td className="border px-4 py-2">{hall.name}</td>
                                <td className="border px-4 py-2">{hall.price}</td>
                                <td className="border px-4 py-2">{hall.capacity}</td>
                                <td className="border px-4 py-2 flex space-x-4">
                                    <Link to={`/admin/hotel/halls/edit/${hall._id}`} className="btn-edit text-blue-600 hover:text-blue-800">
                                      <FaEdit />
                                    </Link>
                                    <button onClick={() => handleDelete(hall._id)} className="btn-delete text-red-600 hover:text-red-800">
                                      <FaTrash />
                                    </button>
                                    <Link to={`/halls/${hall.slug}`} 
                                    className="text-blue-600 hover:text-blue-800"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    > <FaExternalLinkAlt /></Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4">No halls found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
        </>
    );
};

export default AllHalls;
