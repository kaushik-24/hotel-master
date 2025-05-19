// src/components/ManageBooking.tsx

import { GetBookingList } from "@interface/booking.interface";
import { IPagination } from "@interface/global.interface";
import axiosInstance from "@services/instance"; // Ensure this path is correct
import { toast } from "@ui/common/organisms/toast/ToastManage";
import { useDebounce } from "Debounce"; // Adjust the path as necessary
import { useEffect, useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { MdArrowDropDown, MdArrowDropUp, MdDeleteOutline } from "react-icons/md";
import { RiExpandUpDownFill } from "react-icons/ri";
import Pagination from "../organisms/Pagination";
// Import modal components if implemented
// import ViewDetails from "./ViewDetails";
// import EditBooking from "./EditBooking";
// import ConfirmationBox from "./ConfirmationBox";

const ManageBooking = () => {
    // State variables
    const [bookingList, setBookingList] = useState<GetBookingList[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<'view' | 'edit' | 'delete'>('view');
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [originalSort, setOriginalSort] = useState<GetBookingList[]>([]);
    const [sortStatus, setSortStatus] = useState<0 | 1 | 2>(0); // 0: default, 1: descending, 2: ascending
    const [specificBooking, setSpecificBooking] = useState<GetBookingList | undefined>();
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);

    const defaultPagination: IPagination = {
        total: 0,
        totalPages: 1,
        currentPage: 1,
        perpage: rowsPerPage,
    };

    const [pagination, setPagination] = useState<IPagination>(defaultPagination);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch bookings whenever dependencies change
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axiosInstance.get(`/booking`, {
                    params: {
                        page: pagination.currentPage,
                        perpage: rowsPerPage,
                        search: debouncedSearch,
                    },
                });

                console.log('API Response:', response.data); // For debugging

                const responseData = response.data;
                if (responseData.success) {
                    setBookingList(responseData.data);
                    setOriginalSort(responseData.data);
                    // Check if pagination data exists
                    if (responseData.pagination) {
                        setPagination(responseData.pagination);
                    } else {
                        // If pagination data is missing, use default or calculate manually
                        setPagination({
                            total: responseData.data.length,
                            totalPages: 1,
                            currentPage: 1,
                            perpage: rowsPerPage,
                        });
                    }
                } else {
                    setError("Failed to fetch bookings.");
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error('Error fetching bookings:', err);
                setError(err.response?.data?.message || 'An error occurred while fetching bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [refresh, rowsPerPage, pagination.currentPage, debouncedSearch]);

    // Handle Delete Confirmation
    const handleDeleteConfirm = () => {
        if (selectedBookingId) {
            handleDelete(selectedBookingId);
        }
        closeModal();
    };

    // Handle Delete Operation
    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/booking/${id}`);
            setBookingList(prevList => prevList.filter(booking => booking._id !== id));

            toast.show({ title: "Success", content: "Deleted successfully", duration: 2000, type: 'success' });
        } catch (error) {
            console.error('Error deleting booking:', error);
            toast.show({ title: "Error", content: "Delete unsuccessful", duration: 2000, type: 'error' });
        }
    };

    // Open Modal
    const openModal = (type: 'view' | 'edit' | 'delete', booking: GetBookingList) => {
        setModalContent(type);
        setSpecificBooking(booking);
        setSelectedBookingId(booking._id); // Use _id instead of id
        setModal(true);
    };

    // Close Modal
    const closeModal = () => {
        setModal(false);
        setSelectedBookingId(null);
        setSpecificBooking(undefined);
    };

    // Sort Bookings by Name
    const handleSortClick = () => {
        setSortStatus(prevStatus => {
            const newStatus = prevStatus === 0 ? 1 : prevStatus === 1 ? 2 : 0;

            if (newStatus === 0) {
                setBookingList(originalSort);
            } else {
                const sortedList = [...bookingList].sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();

                    if (newStatus === 1) {
                        return nameB.localeCompare(nameA); // Descending
                    } else if (newStatus === 2) {
                        return nameA.localeCompare(nameB); // Ascending
                    }
                    return 0;
                });
                setBookingList(sortedList);
            }

            return newStatus;
        });
    };

    // Update Booking List after Edit (Uncomment and implement if needed)
    // const updateBookingList = (updatedBooking: GetBookingList) => {
    //     setBookingList(prevList =>
    //         prevList.map(booking => (booking._id === updatedBooking._id ? updatedBooking : booking))
    //     );
    // };

    return (
        <div className="relative w-full mt-10 px-5 z-0">
            {/* Search Bar */}
            <div className="flex justify-end items-center mb-4 relative">
                <input
                    className="p-2 pr-10 rounded-xl focus:outline-none border border-gray-300"
                    type="text"
                    placeholder="Search Booking"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <FaSearch />
                </div>
            </div>

            {/* Booking Table */}
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="text-center py-10">Loading bookings...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : bookingList.length === 0 ? (
                    <div className="text-center py-10">No bookings found.</div>
                ) : (
                    <table className="min-w-full bg-white border">
                        <thead className="bg-blue-400 text-white">
                            <tr>
                                <th className="px-6 py-3 border">S.N</th>
                                <th className="px-6 py-3 border flex justify-center items-center">
                                    Name
                                    <div className="p-2 cursor-pointer" onClick={handleSortClick}>
                                        {sortStatus === 0 && <RiExpandUpDownFill size={22} />}
                                        {sortStatus === 1 && <MdArrowDropDown size={24} />}
                                        {sortStatus === 2 && <MdArrowDropUp size={24} />}
                                    </div>
                                </th>
                                <th className="px-6 py-3 border">Number of Rooms</th>
                                <th className="px-6 py-3 border">Rooms</th>
                                <th className="px-6 py-3 border">Check-In Date</th>
                                <th className="px-6 py-3 border">Check-Out Date</th>
                                <th className="px-6 py-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingList.map((booking, index) => (
                                <tr key={booking._id} className="border-b hover:bg-gray-100">
                                    <td className="px-6 py-4 border">{(pagination.currentPage - 1) * pagination.perpage + index + 1}</td>
                                    <td className="px-6 py-4 border">{booking.name}</td>
                                    <td className="px-6 py-4 border">{booking.numberOfRoom}</td>
                                    <td className="px-6 py-4 border">{booking.rooms.join(", ")}</td>
                                    <td className="px-6 py-4 border">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 border">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 border flex justify-center space-x-4">
                                        {/* Action Buttons */}
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => openModal('view', booking)}
                                        >
                                            View
                                        </button>
                                        {/* <button
                                            className="text-green-600 hover:text-green-800"
                                            onClick={() => openModal('edit', booking)}
                                        >
                                            Edit
                                        </button> */}
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => openModal('delete', booking)}
                                        >
                                            <MdDeleteOutline size={24} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Modal */}
                {modal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <div className="flex justify-end">
                                <button onClick={closeModal} className="text-red-500">
                                    <FaWindowClose size={24} />
                                </button>
                            </div>
                            {modalContent === 'view' && specificBooking && (
                                // Replace with your ViewDetails component
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Booking Details</h2>
                                    <p><strong>Name:</strong> {specificBooking.name}</p>
                                    <p><strong>Number of Rooms:</strong> {specificBooking.numberOfRoom}</p>
                                    <p><strong>Rooms:</strong> {specificBooking.rooms.join(", ")}</p>
                                    <p><strong>Check-In Date:</strong> {new Date(specificBooking.checkInDate).toLocaleDateString()}</p>
                                    <p><strong>Check-Out Date:</strong> {new Date(specificBooking.checkOutDate).toLocaleDateString()}</p>
                                </div>
                            )}
                            {modalContent === 'edit' && specificBooking && (
                                // Replace with your EditBooking component
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
                                    {/* Implement your EditBooking component here */}
                                    <p>Editing booking: {specificBooking.name}</p>
                                </div>
                            )}
                            {modalContent === 'delete' && specificBooking && (
                                // Replace with your ConfirmationBox component
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                                    <p>Are you sure you want to delete the booking for <strong>{specificBooking.name}</strong>?</p>
                                    <div className="flex justify-end mt-4 space-x-4">
                                        <button
                                            onClick={closeModal}
                                            className="px-4 py-2 bg-gray-300 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDeleteConfirm}
                                            className="px-4 py-2 bg-red-500 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                totalPages={pagination}
                setTotalPages={setPagination}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setRefresh={() => setRefresh(prev => !prev)}
                currentPage={pagination.currentPage}
                handlePageChange={(page: number) => setPagination(prev => ({ ...prev, currentPage: page }))}
            />
        </div>
    );
};

export default ManageBooking;
