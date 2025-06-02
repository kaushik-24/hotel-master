import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { fetchAdmins, deleteAdmin } from '../../../services/adminService';
import { Admin } from '@type/admin';
import { ROLE } from '@type/admin';

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perpage: 10,
    total: 0,
    totalPages: 0
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const data = await fetchAdmins(pagination.page, pagination.perpage, search);
      setAdmins(data.data);
      setPagination({
        page: data.pagination.page,
        perpage: data.pagination.perpage,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages
      });
      setError('');
    } catch (err) {
      setError('Failed to load admins');
      console.error('Failed to load admins:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, [pagination.page, pagination.perpage, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination({ ...pagination, perpage: parseInt(e.target.value), page: 1 });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await deleteAdmin(id);
        loadAdmins();
      } catch (err) {
        setError('Failed to delete admin');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Admin Management</h1>
          <button
            onClick={() => navigate('/admin/users/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Admin
          </button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row items-center">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search admins..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="ml-0 md:ml-4 flex items-center">
            <label className="mr-2 text-gray-700">Per page:</label>
            <select
              value={pagination.perpage}
              onChange={handlePerPageChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Created</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{admin.name}</td>
                    <td className="py-3 px-4">{admin.email}</td>
                    <td className="py-3 px-4">{admin.phoneNumber}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        admin.role === ROLE.ADMIN 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/users/edit/${admin._id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(admin._id)}
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
                  <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                    No admins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <div className="mb-4 md:mb-0">
            Showing {admins.length} of {pagination.total} admins
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

export default AdminList;
