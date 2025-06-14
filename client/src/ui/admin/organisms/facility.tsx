import axiosInstance from '@services/instance';
import React, { useState, useEffect } from 'react';

interface Facility {
  _id: string;
  name: string;
  isActive: boolean;
}

const Facility: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [form, setForm] = useState({ name: '',  isActive: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/facility');
      setFacilities(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch facilities');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name ) {
      setError('Name are required');
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post('/api/facility', form);
      setForm({ name: '',  isActive: true });
      setError(null);
      await fetchFacilities();
    } catch (err: any) {
      setError(err.message || 'Failed to add facility');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

   const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this facility?')) {
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/facility/${id}`);
      setError(null);
      await fetchFacilities();
    } catch (err: any) {
      setError(err.message || 'Failed to delete facility');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, isActive: e.target.checked });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hotel Facilities Management</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Active
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Adding...' : 'Add Facility'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {loading ? (
        <p className="text-gray-600">Loading facilities...</p>
      ) : facilities.length === 0 ? (
        <p className="text-gray-600">No facilities found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((facility) => (
            <div key={facility._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{facility.name}</h2>
              <p className="text-sm">
                Status: {facility.isActive ? 'Active' : 'Inactive'}
              </p>
              <button
                onClick={() => handleDelete(facility._id)}
                className="text-red-500 hover:text-red-700"
                title="Delete facility"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Facility;
