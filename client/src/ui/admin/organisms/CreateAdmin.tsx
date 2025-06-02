import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaUser } from 'react-icons/fa';
import { fetchAdminById, createAdmin, updateAdmin } from '../../../services/adminService';
import { Admin, CreateAdminDTO, UpdateAdminDTO } from '../../../types/admin';

const CreateAdmin: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [formData, setFormData] = useState<CreateAdminDTO | UpdateAdminDTO>({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const loadAdmin = async () => {
        try {
          const admin = await fetchAdminById(id);
          setFormData({
            name: admin.name,
            email: admin.email,
            phoneNumber: admin.phoneNumber,
            password: ''
          });
          setFormError('');
        } catch (err) {
          setFormError('Failed to load admin');
          console.error('Failed to load admin:', err);
        } finally {
          setLoading(false);
        }
      };
      loadAdmin();
    }
  }, [id]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone is required';
    if (!id && !formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (id) {
        await updateAdmin(id, formData as UpdateAdminDTO);
      } else {
        await createAdmin(formData as CreateAdminDTO);
      }
      navigate('/admin/users');
    } catch (error) {
      setFormError('Operation failed. Please try again.');
      console.error('Operation failed:', error);
    } finally {
      setIsSubmitting(false);
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
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUser className="mr-2 text-blue-600" />
            {id ? 'Edit Admin' : 'Create New Admin'}
          </h2>
          <button
            onClick={() => navigate('/admin/users')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft className="mr-1" /> Back to List
          </button>
        </div>

        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!!id}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'
              } ${id ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phoneNumber ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password {id && <span className="text-gray-500 text-sm">(leave blank to keep current)</span>}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'
              }`}
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center w-full py-3 px-4 rounded-lg text-white ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  {id ? 'Update Admin' : 'Create Admin'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
