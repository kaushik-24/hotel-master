import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';
import axiosInstance from '@services/instance';

interface Room {
  _id: string;
  roomNumber: string;
  roomType: string;
  floor: string;
}

const AllRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadRooms = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/room', {
        params: { search },
      });
      const roomData = response.data?.data;
      if (Array.isArray(roomData)) {
        setRooms(roomData);
        setError('');
      } else {
        setError('Unexpected data format');
        setRooms([]);
      }
    } catch (error) {
      setError('Failed to load rooms');
      console.error('Error fetching rooms:', error);
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
    loadRooms();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axiosInstance.delete(`/api/room/${id}`);
        loadRooms();
      } catch (error) {
        setError('Failed to delete room');
        console.error('Error deleting room:', error);
      }
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Room Management</h1>
          <Link to="/admin/hotel/rooms/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center text-sm">
              <FaPlus className="mr-2" /> Add Room
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search rooms..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
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
                  <th className="py-2 px-3 text-left">Room Type</th>
                  <th className="py-2 px-3 text-left">Floor</th>
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length > 0 ? (
                  rooms.map(room => (
                    <tr key={room._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{room.roomNumber}</td>
                      <td className='py-2 px-3'>{room.roomType}</td>
                      <td className="py-2 px-3">{room.floor}</td>
                      
                      <td className="py-2 px-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/admin/hotel/rooms/edit/${room._id}`)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(room._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/rooms/${room.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaExternalLinkAlt />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                      No rooms found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

              </div>
    </div>
  );
};

export default AllRooms;
