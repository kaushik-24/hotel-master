import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft} from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { MdOutlineBedroomParent } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

interface BlogPostData {
  title: string;
  author: string;
  image: string;
  content: string;
}

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const { blogPostId } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BlogPostData>({
    defaultValues: {
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Fetch room data for editing
  useEffect(() => {
    const fetchBlogData = async () => {
      if (blogPostId) {
        try {
          const response = await axiosInstance.get(`/api/blogPost/${blogPostId}`);
          const blogPostData = response.data.data;
          setValue("title", blogPostData.title || "");
          setValue("author", blogPostData.author || "");
          setValue("content", blogPostData.content || 0);
          if (blogPostData.image) {
            setImagePreview(`${import.meta.env.VITE_APP_BASE_URL}${blogPostData.image}`);
          }
        } catch (error) {
          console.error("Error fetching blog data:", error);
        }
      }
    };
    fetchBlogData();
  }, [blogPostId, setValue]);

  // Clean up image preview
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // Handle file input for room image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setSelectedFile(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  // Handle form submission
  const onSubmit = async (data: BlogPostData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("author", data.author || "");
      formData.append("content", data.content || "");
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      if (blogPostId) {
        await axiosInstance.put(`/api/blogPost/${blogPostId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/api/blogPost", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/cms/blogs", { replace: true });
    } catch (error) {
      console.error("Error submitting blog data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlineBedroomParent className="mr-2 text-blue-600" />
            {blogPostId ? 'Edit Blog Post' : 'Create Blog Post'}
          </h2>
          <button
            onClick={() => navigate('/admin/cms/blogs')}
            className="flex items-center text-gray-600 hover:text-[#019cec]"
          >
            <FaArrowLeft className="mr-1" /> Back to List
          </button>
      </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Information Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label name="title" label="title" />
                <InputField
                  name="title"
                  type="text"
                  placeholder="Enter title for blog "
                  register={register}
                  required="Title is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>
               <div>
                <Label name="author" label="author" />
                <InputField
                  name="author"
                  type="text"
                  placeholder="Enter author for blog "
                  register={register}
                  required="Author is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
              </div> 
              </div>
          </div>

          {/* Descriptions Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Description
            </h3>
            <div className="space-y-6">
            <div>
                <Label name="content" label="Content"  />
                <textarea
                  placeholder="Enter your contents"
                  {...register("content", { required: "Content is required" })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 text-sm"
                  rows={5}
                />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Media
            </h3>
            <div>
              <Label name="image" label="Image for blog Post"  />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#019cec] file:text-white hover:file:bg-[#017a9b] cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-4 relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-48 h-32 object-cover rounded-md border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedFile(null);
                    }}
                    className="absolute top-1 right-1 bg-red-600/80 text-white text-xs px-2 py-1 rounded hover:bg-red-700/90 shadow"
                    aria-label="Remove image"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/cms/blogs")}
              className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 font-poppins hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >
              {blogPostId ? "Update Blog Post" : "Create Blog Post"}
            </button>
          </div>
                  </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;

