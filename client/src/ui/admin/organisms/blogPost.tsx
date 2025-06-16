import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axiosInstance from '@services/instance';

interface BlogPostData {
  title: string;
  author: string;
  content: string;
  image?: File;
}

const Label = ({ name, label }: { name: string; label: string }) => (
  <label htmlFor={name} className="block text-sm font-medium text-primary mb-1">
    {label}
  </label>
);

const InputField = ({
  name,
  type = 'text',
  placeholder,
  register,
  required,
  className,
}: {
  name: string;
  type?: string;
  placeholder: string;
  register: any;
  required?: string;
  className: string;
}) => (
  <input
    id={name}
    type={type}
    placeholder={placeholder}
    {...register(name, { required })}
    className={className}
  />
);

const UploadBlogPost: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostData>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data: BlogPostData) => {
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('content', data.content);
      if (image) {
        formData.append('image', image);
      }

      const response = await axiosInstance.post('/api/blogPost', formData);
      setSuccess(response.data.message);
      navigate('/admin/cms/blog'); // Adjust to your dashboard route
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create blog post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary flex items-center">
            Create Blog Post
          </h2>
          <button
            onClick={() => navigate('/admin/cms/blog')}
            className="flex items-center text-primary hover:text-primary-dark"
          >
            <FaArrowLeft className="mr-1" /> Back to Dashboard
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Blog Post Information Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-primary mb-4 border-b-2 border-primary-dark pb-2">
              Blog Post Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label name="title" label="Title" />
                <InputField
                  name="title"
                  placeholder="Enter blog post title"
                  register={register}
                  required="Title is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/20"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label name="author" label="Author" />
                <InputField
                  name="author"
                  placeholder="Enter author name"
                  register={register}
                  required="Author is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/20"
                />
                {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Label name="content" label="Content" />
                <textarea
                  id="content"
                  placeholder="Enter blog post content"
                  {...register('content', { required: 'Content is required' })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/20 min-h-[120px] resize-y"
                />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Label name="image" label="Image (Optional)" />
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/20"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/cms/blog')}
              className="px-6 py-2 bg-gray-300 rounded-md text-primary font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-primary-dark rounded-md text-secondary font-medium hover:bg-primary-dark/80 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Publish Blog Post'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-3">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default UploadBlogPost;
