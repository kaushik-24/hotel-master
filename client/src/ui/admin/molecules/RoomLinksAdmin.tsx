import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";

interface Room {
    _id: string;
    page: string;
}

const RoomLinksAdmin = () => {
    const [rows, setRows] = useState<Room[]>([{ _id: "", page: "" }]);
    const [showModal, setShowModal] = useState(false);  // Modal visibility state
    const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);  // Selected room to delete

    // Fetch room data from the API on component mount
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axiosInstance.get("/room");
                const roomsData = Array.isArray(response.data) ? response.data : response.data.data;
                const fetchedRooms = roomsData.map((room: { _id: string, name: string }) => ({
                    _id: room._id,
                    page: room.name,
                }));
                setRows(fetchedRooms.length > 0 ? fetchedRooms : [{ _id: "", page: "" }]);
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };
        fetchRooms();
    }, []);

    // Function to handle adding a new row
    const handleAddRow = () => {
        setRows([...rows, { _id: "", page: "" }]);
    };

    // Function to show confirmation modal before deleting a row
    const handleDeleteClick = (room: Room) => {
        setRoomToDelete(room);
        setShowModal(true);
    };

    // Function to actually delete the room after confirmation
    const handleDeleteRow = async () => {
        if (!roomToDelete || !roomToDelete._id) return;
        try {
            await axiosInstance.delete(`/room/${roomToDelete._id}`);
            setRows(rows.filter((row) => row._id !== roomToDelete._id));
        } catch (error) {
            console.error("Error deleting room:", error);
        } finally {
            setShowModal(false);
            setRoomToDelete(null);
        }
    };

    // Function to handle input changes for the pages
    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newRows = [...rows];
        newRows[index].page = event.target.value;
        setRows(newRows);
    };

    return (
        <div className="p-4">
            <p className="font-poppins text-[0.875rem] mb-4">Room</p>

            {/* Heading */}
            <div className="flex items-center gap-4 font-semibold mb-2">
                <p className="font-poppins font-medium text-[1rem] w-12">S.N</p>
                <p className="font-poppins font-medium text-[1rem] flex-1">Pages</p>
                <p className="w-24">
                    <button
                        type="button"
                        onClick={handleAddRow}
                        className="bg-[#6b3aa3] text-white py-1 px-2 rounded-md"
                    >
                        Add New
                    </button>
                </p>
            </div>

            {/* Rows */}
            {rows.map((row, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                    <p className="font-poppins w-12">{index + 1}</p>
                    {/* Page Input */}
                    <input
                        type="text"
                        value={row.page}
                        onChange={(event) => handleInputChange(index, event)}
                        className="flex-1 border border-gray-300 px-[0.75rem] py-[0.4375rem] rounded-md focus:outline-none"
                        placeholder="Enter page name"
                    />
                    {/* Add & Delete Buttons */}
                    <div className="flex gap-2 w-24">
                        <button
                            type="button"
                            onClick={handleAddRow}
                            className="bg-[#6b3aa3] hover:bg-[#713dad] text-white px-[0.6rem] py-[0.47rem] rounded-md"
                        >
                            <IoAddCircleOutline />
                        </button>
                        {rows.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleDeleteClick(row)}
                                className="bg-red-500 hover:bg-red-600 text-white px-[0.6rem] py-[0.47rem] rounded-md"
                            >
                                <IoTrashOutline />
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete the room "{roomToDelete?.page}"?</p>
                        <div className="flex justify-end mt-4 space-x-4">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                                Cancel
                            </button>
                            <button onClick={handleDeleteRow} className="px-4 py-2 bg-red-500 text-white rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomLinksAdmin;
