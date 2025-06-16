import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "@services/instance";

interface AboutUsData {
  subtitle: string;
  heading: string;
  subheading: string;
  description1: string;
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

const HomeAboutUsForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AboutUsData>();
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // Fetch existing About Us data to determine create or update
  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await axiosInstance.get("/api/homeAboutUs");
        if (response.data.success && response.data.data) {
          const { subtitle, heading, subheading, description1 } = response.data.data;
          setValue("subtitle", subtitle);
          setValue("heading", heading);
          setValue("subheading", subheading);
          setValue("description1", description1);
          setIsUpdate(true);
        }
      } catch (err: any) {
        // If no data exists, assume create operation
        setIsUpdate(false);
      }
    };

    fetchAboutUsData();
  }, [setValue]);

  // Handle form submission
  const onSubmit = async (data: AboutUsData) => {
    setError(null);
    try {
      const endpoint = "/api/homeAboutUs";
      const method = isUpdate ? axiosInstance.put : axiosInstance.post;
      await method(endpoint, data);
      navigate("/admin/cms/home"); // Adjust to your dashboard route
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save About Us data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            {isUpdate ? "Edit About Us Section" : "Create About Us Section"}
          </h2>
          <button
            onClick={() => navigate("/admin/cms/home")}
            className="flex items-center text-gray-600 hover:text-[#019cec]"
          >
            <FaArrowLeft className="mr-1" /> Back to Dashboard
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* About Us Information Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              About Us Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label name="subtitle" label="Subtitle" />
                <InputField
                  name="subtitle"
                  placeholder="Enter subtitle (e.g., find yourself at venus)"
                  register={register}
                  required="Subtitle is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>}
              </div>
              <div>
                <Label name="heading" label="Main Heading" />
                <InputField
                  name="heading"
                  placeholder="Enter main heading (e.g., Your Peace Abode in the City)"
                  register={register}
                  required="Main heading is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.heading && <p className="text-red-500 text-sm mt-1">{errors.heading.message}</p>}
              </div>
              <div>
                <Label name="subheading" label="Sub Heading" />
                <InputField
                  name="subheading"
                  placeholder="Enter sub heading (e.g., Hotel Shambala, a Tibetan boutique hotel...)"
                  register={register}
                  required="Sub heading is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.subheading && <p className="text-red-500 text-sm mt-1">{errors.subheading.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Label name="description1" label="Description" />
                <textarea
                  id="description1"
                  placeholder="Enter description (e.g., At Hotel Shambala, we invite our guests...)"
                  {...register("description1", { required: "Description is required" })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 min-h-[120px] resize-y font-poppins"
                />
                {errors.description1 && <p className="text-red-500 text-sm mt-1">{errors.description1.message}</p>}
              </div>
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
              {isSubmitting ? "Saving..." : isUpdate ? "Update About Us Section" : "Create About Us Section"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default HomeAboutUsForm;
