import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { MdOutlinePolicy } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

interface PolicyData {
  title: string;
  author: string;
  image: string;
  content: string;
}

const CreatePolicy = () => {
  const navigate = useNavigate();
  const { policyId } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PolicyData>({
    defaultValues: {},
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchPolicyData = async () => {
      if (policyId) {
        try {
          const response = await axiosInstance.get(`/api/policy/${policyId}`);
          const policyData = response.data.data;
          setValue("title", policyData.title || "");
          setValue("author", policyData.author || "");
          setValue("content", policyData.content || "");
          if (policyData.image) {
            setImagePreview(`${import.meta.env.VITE_APP_BASE_URL}${policyData.image}`);
          }
        } catch (error) {
          console.error("Error fetching policy data:", error);
        }
      }
    };
    fetchPolicyData();
  }, [policyId, setValue]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

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

  const onSubmit = async (data: PolicyData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("author", data.author || "");
      formData.append("content", data.content || "");
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      if (policyId) {
        await axiosInstance.put(`/api/policy/${policyId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/api/policy", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/cms/policy", { replace: true });
    } catch (error) {
      console.error("Error submitting policy data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlinePolicy className="mr-2 text-blue-600" />
            {policyId ? 'Edit Policy' : 'Create Policy'}
          </h2>
          <button
            onClick={() => navigate('/admin/cms/policy')}
            className="flex items-center text-gray-600 hover:text-[#019cec]"
          >
            <FaArrowLeft className="mr-1" /> Back to List
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label name="title" label="Title" />
                <InputField
                  name="title"
                  type="text"
                  placeholder="Enter title for policy"
                  register={register}
                  required="Title is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.title && <p className="text-red-500 textackage.json-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label name="author" label="Author" />
                <InputField
                  name="author"
                  type="text"
                  placeholder="Enter author for policy"
                  register={register}
                  required="Author is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
              </div>
            </div>
          </div>

          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Description
            </h3>
            <div className="space-y-6">
              <div>
                <Label name="content" label="Content" />
                <textarea
                  placeholder="Enter your policy content"
                  {...register("content", { required: "Content is required" })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 text-sm"
                  rows={5}
                />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
              </div>
            </div>
          </div>

          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Media
            </h3>
            <div>
              <Label name="image" label="Image for Policy" />
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

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/cms/policy")}
              className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 font-poppins hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >
              {policyId ? "Update Policy" : "Create Policy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePolicy;
