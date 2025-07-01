import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@services/instance";

interface LocationData {
  name: string;
  subtitle: string;
  address: string;
  location: string;
}

const LocationForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LocationData>();
  const [error, setError] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  // Fetch existing Location data to determine create or update
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axiosInstance.get("/api/location");
        if (response.data.success && response.data.data) {
          const { subtitle, name, address, location} = response.data.data;
          setValue("name", name);
          setValue("subtitle", subtitle);
          setValue("address", address);
          setValue("location", location);
          setIsUpdate(true);
        }
      } catch (err: any) {
        // If no data exists, assume create operation
        setIsUpdate(false);
      }
    };

    fetchLocationData();
  }, [setValue]);

  // Handle form submission
  const onSubmit = async (data: LocationData) => {
    setError(null);
    try {
      const endpoint = "/api/location";
      const method = isUpdate ? axiosInstance.put : axiosInstance.post;
      await method(endpoint, data);
      navigate("/admin/setting");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save Location data");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Location and Maps</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name(e.g., Hotel Earth)"
            {...register("name", { required: "Name is required" })}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.name&& <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="subtitle" className="block text-sm font-medium">Description</label>
          <textarea
            id="subtitle"
            placeholder="Enter main heading (e.g., Your Peace Abode in the City)"
            {...register("subtitle", { required: "Main heading is required" })}
            className="mt-1 p-2 w-full border rounded min-h-[120px] resize-y"
          />
          {errors.subtitle&& <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Enter address (e.g., P8QQ+QMG, Ring Rd, Kathmandu 44600 ...)"
            {...register("address", { required: "Sub heading is required" })}
            className="mt-1 p-2 w-full border rounded"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium">Location</label>
          <input
            id="location"
            type="text"
            placeholder="Enter location (e.g., Longitudes, Latitudes...)"
            {...register("location", { required: "Location is required" })}
            className="mt-1 p-2 w-full border rounded "
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/cms/home")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300`}
          >
            {isSubmitting ? "Saving..." : isUpdate ? "Update Location" : "Add Location"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LocationForm;
