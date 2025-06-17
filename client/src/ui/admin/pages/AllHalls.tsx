import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';
import axiosInstance from '@services/instance';

interface Hall {
  _id: string;
  slug: string;
  name: string;
  capacity: number;
  price: number;
  shortdesc: string;
  features: string[];
}

const AllHalls: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadHalls = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/halls', {
        params: { search },
      });
      const hallData = response.data?.data;
      if (Array.isArray(hallData)) {
        setHalls(hallData);
        setError('');
      } else {
        setError('Unexpected data format');
        setHalls([]);
      }
    } catch (error) {
      setError('Failed to load halls');
      console.error('Error fetching halls:', error);
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
    loadHalls();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this hall?')) {
      try {
        await axiosInstance.delete(`/api/halls/${id}`);
        loadHalls();
      } catch (error) {
        setError('Failed to delete hall');
        console.error('Error deleting hall:', error);
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Hall Management</h1>
          <Link to="/admin/hotel/halls/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center text-sm">
              <FaPlus className="mr-2" /> Add Hall
            </button>
          </Link>
        </div>

        
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
                  <th className="py-2 px-3 text-left">Price</th>
                  <th className="py-2 px-3 text-left">Capacity</th>
                  <th className="py-2 px-3 text-left">Features</th>
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {halls.length > 0 ? (
                  halls.map(hall => (
                    <tr key={hall._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{hall.name}</td>
                      <td className="py-2 px-3">${hall.price.toFixed(2)}</td>
                      <td className="py-2 px-3">{hall.capacity}</td>
                      <td className="py-2 px-3">
                        {hall.features.join(', ')}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/admin/hotel/halls/edit/${hall._id}`)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(hall._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/halls/${hall.slug}`}
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
                      No halls found
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

export default AllHalls;
