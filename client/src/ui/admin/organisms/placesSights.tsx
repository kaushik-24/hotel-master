import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // For navigation
import { MdOutlineImage } from "react-icons/md"; // Icon for header
import axiosInstance from "@services/instance";

// Assuming Label and InputField components are defined elsewhere
interface LabelProps {
  name: string;
  label: string;
}

const Label: React.FC<LabelProps> = ({ name, label }) => (
  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
    {label}
  </label>
);

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  register: any;
  required: string | boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, register, required, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    {...register(name, { required })}
    className={className}
  />
);

interface PlacesSightsData {
  heading1: string;
  description: string;
  placesSightsImage: string;
}

interface FormData {
  heading1: string;
  description: string;
  placesSightsImage?: FileList;
}

const PlacesSights: React.FC = () => {
  const [placesSightsData, setPlacesSightsData] = useState<PlacesSightsData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      heading1: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchSightsPlacesData();
  }, []);

  const fetchSightsPlacesData = async () => {
    try {
      const response = await axiosInstance.get("/api/placesSights");
      const data = response.data.data;
      setPlacesSightsData(data);
      setValue("heading1", data.heading1);
      setValue("description", data.description);
      setImagePreview(data.placesSightsImage);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch hero data");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormData) => {
    setError(null);
    const formData = new FormData();
    formData.append("heading1", data.heading1);
    formData.append("description", data.description);
    if (selectedFile) {
      formData.append("placesSightsImage", selectedFile);
    }

    try {
      const response = placesSightsData
        ? await axiosInstance.put("/api/placesSights", formData)
        : await axiosInstance.post("/api/placesSights", formData);
      setPlacesSightsData(response.data.data);
      setImagePreview(response.data.data.placesSightsImage);
      navigate("/admin/cms/home"); // Adjust to your dashboard route

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save placesSights data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlineImage className="mr-2 text-blue-600" />
            {placesSightsData ? "Edit Places & Sights" : "Create Places & Sights"}
          </h2>
          <button
            onClick={() => navigate("/admin/cms/home")} // Adjust the navigation path as needed
            className="flex items-center text-gray-600 hover:text-[#019cec]"
          >
            <FaArrowLeft className="mr-1" /> Back to Dashboard
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Hero Information Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Places & Sights Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label name="heading1" label="Main Heading" />
                <InputField
                  name="heading1"
                  type="text"
                  placeholder="Enter main heading"
                  register={register}
                  required="Main heading is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.heading1 && <p className="text-red-500 text-sm mt-1">{errors.heading1.message}</p>}
              </div>
              <div>
                <Label name="description" label="Sub Heading" />
                <InputField
                  name="description"
                  type="text"
                  placeholder="Enter sub heading"
                  register={register}
                  required="Sub heading is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Media
            </h3>
            <div>
              <Label name="placesSightsImage" label="placesSightsImage" />
              <input
                type="file"
                accept="image/*"
                {...register("placesSightsImage")}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#019cec] file:text-white hover:file:bg-[#017a9b] cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-4 relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
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
              onClick={() => navigate("/admin/cms/home")} // Adjust the navigation path as needed
              className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 font-poppins hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >
              {placesSightsData ? "Update Places & Sights" : "Create Places & Sights"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PlacesSights;


