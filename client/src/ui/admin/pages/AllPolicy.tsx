import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaExternalLinkAlt } from 'react-icons/fa';
import axiosInstance from '@services/instance';

interface Policy {
  _id: string;
  slug: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
}

const AllPolicies: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadPolicies = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/policy');
      const policyData = response.data?.data;
      if (Array.isArray(policyData)) {
        setPolicies(policyData);
        setError('');
      } else {
        setError('Unexpected data format');
        setPolicies([]);
      }
    } catch (error) {
      setError('Failed to load policies');
      console.error('Error fetching policies:', error);
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
    loadPolicies();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      try {
        await axiosInstance.delete(`/api/policy/${id}`);
        loadPolicies();
      } catch (error) {
        setError('Failed to delete policy');
        console.error('Error deleting policy:', error);
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Policy Management</h1>
          <Link to="/admin/cms/policy/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center text-sm">
              <FaPlus className="mr-2" /> Add Policy
            </button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-3 text-left">Title</th>
                  <th className="py-2 px-3 text-left">Author</th>
                  <th className="py-2 px-3 text-left">Created Date</th>
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {policies.length > 0 ? (
                  policies.map(policy => (
                    <tr key={policy._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{policy.title}</td>
                      <td className="py-2 px-3">{policy.author}</td>
                      <td className="py-2 px-3">
                        {new Date(policy.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/admin/cms/policy/edit/${policy._id}`)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(policy._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/policy/${policy.slug}`}
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
                    <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                      No policies found
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

export default AllPolicies;
