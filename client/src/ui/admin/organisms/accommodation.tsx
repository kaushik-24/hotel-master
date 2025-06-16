import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import axiosInstance from "@services/instance";

interface AccommodationData {
  heading: string;
}

const Label = ({ name, label }: { name: string; label: string }) => (
  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
    {label}
  </label>
);

const InputField = ({
  name,
  type = "text",
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

const AccommodationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AccommodationData>();
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // Fetch existing Accommodation data to determine create or update
  useEffect(() => {
    const fetchAccommodationData = async () => {
      try {
        const response = await axiosInstance.get("/api/accommodation");
        if (response.data.success && response.data.data) {
          const { heading } = response.data.data;
          setValue("heading", heading);
          setIsUpdate(true);
        }
      } catch (err: any) {
        // If no data exists, assume create operation
        setIsUpdate(false);
      }
    };

    fetchAccommodationData();
  }, [setValue]);

  // Handle form submission
  const onSubmit = async (data: AccommodationData) => {
    setError(null);
    try {
      const endpoint = "/api/accommodation";
      const method = isUpdate ? axiosInstance.put : axiosInstance.post;
      await method(endpoint, data);
      navigate("/admin/cms/home"); // Adjust to your dashboard route
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save Accommodation data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            {isUpdate ? "Edit Accommodation Section" : "Create Accommodation Section"}
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/cms/home")}
              className="flex items-center text-gray-600 hover:text-[#019cec]"
            >
              <FaArrowLeft className="mr-1" /> Back to Dashboard
            </button>
            
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Accommodation Information Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Accommodation Information
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label name="heading" label="Heading" />
                <InputField
                  name="heading"
                  placeholder="Enter heading (e.g., Our Accommodations)"
                  register={register}
                  required="Heading is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.heading && <p className="text-red-500 text-sm mt-1">{errors.heading.message}</p>}
              </div>
              
            </div>
            <div className="flex items-center gap-4 mt-5">
            <Link
              to={"/admin/roomType"}
              className="flex items-center text-gray-600 hover:text-[#019cec]"
            >
              <FaExternalLinkAlt className="mr-1" /> Edit Room Details</Link>
          </div>

          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/cms/home")}
              className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 font-poppins hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Saving..." : isUpdate ? "Update Accommodation Section" : "Create Accommodation Section"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AccommodationForm;
