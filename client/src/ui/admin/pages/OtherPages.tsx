import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

interface Page {
    _id: string;
    name: string;
    heading: string;
    shortdesc: string;
    longdesc: string;
}

interface Pagination {
    page: number;
    perpage: number;
    total: number;
    totalPages: number;
}

const OtherPages = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [allPages, setAllPages] = useState<Page[]>([]); // For client-side filtering
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        perpage: 10,
        total: 0,
        totalPages: 0
    });
    const [isMobile, setIsMobile] = useState(false);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const [editForm, setEditForm] = useState({ name: '', slug: '' });

    const fetchPages = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/api/page", {
                params: { page: pagination.page, perpage: pagination.perpage, search }
            });
            console.log("API Response:", response.data); // Debug log
            const responseData = response.data;

            let pageData: Page[];
            let paginationData: Pagination;

            if (Array.isArray(responseData.data)) {
                pageData = responseData.data;
                paginationData = responseData.pagination || {
                    page: pagination.page,
                    perpage: pagination.perpage,
                    total: pageData.length,
                    totalPages: Math.ceil(pageData.length / pagination.perpage)
                };
            } else {
                throw new Error("Unexpected data format");
            }

            // Store raw data for client-side filtering
            setAllPages(pageData);
            // Apply client-side filtering if search term exists
            const filteredPages = search
                ? pageData.filter(page =>
                      page.name.toLowerCase().includes(search.toLowerCase())
                  )
                : pageData;

            setPages(filteredPages);
            setPagination({
                ...paginationData,
                total: filteredPages.length,
                totalPages: Math.ceil(filteredPages.length / pagination.perpage)
            });
            setError('');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to load pages';
            setError(errorMessage);
            console.error("Error fetching pages:", error);
            setPages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        fetchPages();
    }, [pagination.page, pagination.perpage, search]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination({ ...pagination, page: newPage });
        }
    };

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPagination({ ...pagination, perpage: parseInt(e.target.value), page: 1 });
    };

    const openDeleteModal = (page: Page) => {
        setSelectedPage(page);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedPage(null);
    };
   
    const handleDelete = async () => {
        if (!selectedPage) return;
        try {
            await axiosInstance.delete(`/api/page/${selectedPage._id}`);
            closeDeleteModal();
            fetchPages();
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to delete page');
            console.error("Error deleting page:", error);
        }
    };
   
    if (isMobile) {
        return (
            <div className="flex flex-col items-center justify-center h-screen p-4 text-center bg-gray-100">
                <h2 className="text-xl font-bold text-red-600 mb-4">Desktop Required</h2>
                <p className="text-gray-700">
                    This CMS is best viewed on a desktop or larger screen. <br />
                    Please switch to a desktop device for full access.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Page Management</h1>
                    <Link
                        to="/admin/pages/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center text-sm"
                    >
                        <FaPlus className="mr-2" /> Create Page
                    </Link>
                </div>

                {/* Search + Per Page */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search pages..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={search}
                            onChange={(e) => {
                                console.log("Search term:", e.target.value); // Debug log
                                setSearch(e.target.value);
                            }}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2 text-gray-700 text-sm">Per page:</label>
                        <select
                            value={pagination.perpage}
                            onChange={handlePerPageChange}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            {[5, 10, 25, 50].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Delete Modal */}
                {showDeleteModal && selectedPage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
                            <p className="text-gray-700 mb-6">
                                Are you sure you want to delete the page "{selectedPage.name}"?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={closeDeleteModal}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                
                {/* Table or Loader */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <table className="min-w-full bg-white text-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-3 text-left">Name</th>
                                    <th className="py-2 px-3 text-left">Slug</th>
                                    <th className="py-2 px-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.length > 0 ? (
                                    pages.map((page) => (
                                        <tr key={page._id} className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-3">{page.name}</td>
                                            <td className="py-2 px-3">{page.slug}</td>
                                            <td className="py-2 px-3">
                                                <div className="flex space-x-2">
                                                    <Link to={`/admin/pages/edit/${page._id}`}
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => openDeleteModal(page)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                                            No pages found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-sm">
                    <div>
                        Showing {pages.length} of {pagination.total} pages
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className={`px-4 py-2 rounded ${
                                pagination.page === 1
                                    ? 'bg-gray-200 cursor-not-allowed'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 bg-gray-200 rounded">
                            Page {pagination.page} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page === pagination.totalPages}
                            className={`px-4 py-2 rounded ${
                                pagination.page === pagination.totalPages
                                    ? 'bg-gray-200 cursor-not-allowed'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherPages;
