import { IPagination } from "@interface/global.interface";
import axiosInstance from "@services/instance";
import { toast } from "@ui/common/organisms/toast/ToastManage";
import { useEffect, useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Pagination from "./Pagination";

// Define the User interface
interface IUser {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string; // Adjust this if role is not a string
}

const UserTable = () => {
    // State for user data, modal control, pagination, and search
    const [userList, setUserList] = useState<IUser[]>([]);
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState<'view' | 'edit' | 'delete'>('view');
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [search, setSearch] = useState<string>("");

    const defaultPagination: IPagination = {
        total: 0,
        totalPages: 1,
        currentPage: 1,
        perpage: rowsPerPage,
    };

    const [pagination, setPagination] = useState<IPagination>(defaultPagination);

    // Fetch user data
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = sessionStorage.getItem("accessTokenHotelVenus");

                const response = await axiosInstance.get(`/admin`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: { page: pagination.currentPage, perpage: rowsPerPage, search }
                });

                const userData = response.data.data || [];
                setUserList(userData);
                setPagination(response.data.pagination);

            } catch (error) {
                console.error('Error fetching users:', error);
                toast.show({ title: "Error", content: "Failed to fetch users", duration: 2000, type: 'error' });
            }
        };

        fetchUsers();
    }, [rowsPerPage, pagination.currentPage, search]);

    // Delete user
    const handleDelete = async (id: string) => {
        try {
            console.log('Deleting user with ID:', id); // Debugging line
            const accessToken = sessionStorage.getItem("accessTokenHotelVenus");
            await axiosInstance.delete(`/admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            setUserList(prevList => prevList.filter(user => user._id !== id));
            toast.show({ title: "Success", content: "Deleted successfully", duration: 2000, type: 'success' });
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.show({ title: "Error", content: "Delete unsuccessful", duration: 2000, type: 'error' });
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedUserId) {
            closeModal();
            handleDelete(selectedUserId);
        } else {
            toast.show({ title: "Error", content: "No user selected", duration: 2000, type: 'error' });
        }
    };

    // Modal controls
    const openModal = (type: 'view' | 'edit' | 'delete', user: IUser) => {
        setModalContent(type);
        setSelectedUserId(user._id);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setSelectedUserId(null);
    };

    // Pagination control
    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    return (
        <div className="relative w-full mt-10 px-5 z-0">
            {/* Search input */}
            <div className="flex justify-end items-center mb-2">
                <input
                    className="p-1 rounded-xl focus:outline-none"
                    type="text"
                    placeholder="Search User"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute pr-2">
                    <FaSearch />
                </div>
            </div>

            {/* User table */}
            <div className="overflow-x-auto">
                <table className="table-container w-full text-sm text-center">
                    <thead className="uppercase bg-blue-400">
                        <tr>
                            <th className="px-6 py-3">S.N</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Phone Number</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">View</th>
                            <th className="px-6 py-3">Edit</th>
                            <th className="px-6 py-3">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {userList.length > 0 && userList.map((item, index) => (
                            <tr key={item._id} className="border-b-2">
                                <td className="px-6 py-3">
                                    {(pagination.currentPage - 1) * pagination.perpage + index + 1}
                                </td>
                                <td className="px-6 py-3">{item.name}</td>
                                <td className="px-6 py-3">{item.email}</td>
                                <td className="px-6 py-3">{item.phoneNumber}</td>
                                <td className="px-6 py-3">{item.role.toLowerCase()}</td>
                                <td className="px-6 py-3 font-bold text-blue-700 cursor-pointer underline" onClick={() => openModal('view', item)}>
                                    View
                                </td>
                                <td className="px-6 py-3 font-bold text-blue-700 cursor-pointer underline" onClick={() => openModal('edit', item)}>
                                    Edit
                                </td>
                                <td className="px-6 py-3 text-red-600 inline-block cursor-pointer">
                                    <MdDeleteOutline size={24} onClick={() => openModal('delete', item)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal for view/edit/delete */}
                {modal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <div className="flex justify-end">
                                <button onClick={closeModal} className="text-red-500">
                                    <FaWindowClose size={24} />
                                </button>
                            </div>
                            {modalContent === 'view' && selectedUserId && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">User Details</h2>
                                    {/* You can add more detailed user info here */}
                                </div>
                            )}
                            {modalContent === 'edit' && selectedUserId && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Edit User</h2>
                                    <p>Editing user: {selectedUserId}</p>
                                </div>
                            )}
                            {modalContent === 'delete' && selectedUserId && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                                    <p>Are you sure you want to delete the user?</p>
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

            {/* Pagination component */}
            <Pagination
                totalPages={pagination}
                setTotalPages={setPagination}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                currentPage={pagination.currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default UserTable;
