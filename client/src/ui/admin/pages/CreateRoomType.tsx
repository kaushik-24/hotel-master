import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft} from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { MdOutlineBedroomParent } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

interface Facility {
  _id: string;
  name: string;
}

interface RoomData {
  name: string;
  price: number;
  shortdesc: string;
  features: string[]; // Stores facility names
  roomImage: string;
  capacity: number;
  heading: string;
  longdesc: string;
}

const CreateRoomType = () => {
  const navigate = useNavigate();
  const { roomTypeId } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RoomData>({
    defaultValues: {
      features: [],
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  // Fetch facilities from backend
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axiosInstance.get('/api/facility');
        setFacilities(response.data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };
    fetchFacilities();
  }, []);

  // Fetch room data for editing
  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomTypeId) {
        try {
          const response = await axiosInstance.get(`/api/roomType/${roomTypeId}`);
          const roomData = response.data.data;
          setValue("name", roomData.name || "");
          setValue("price", roomData.price || 0);
          setValue("shortdesc", roomData.shortdesc || "");
          const features = roomData.features || [];
          setSelectedFacilities(features);
          setValue("features", features);
          setValue("capacity", roomData.capacity || 0);
          setValue("heading", roomData.heading || "");
          setValue("longdesc", roomData.longdesc || "");
          if (roomData.roomImage) {
            setImagePreview(`${import.meta.env.VITE_APP_BASE_URL}${roomData.roomImage}`);
          }
        } catch (error) {
          console.error("Error fetching room data:", error);
        }
      }
    };
    fetchRoomData();
  }, [roomTypeId, setValue]);

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

  // Handle facility selection
  const handleFacilityChange = (facilityName: string, checked: boolean) => {
    const updatedFacilities = checked
      ? [...selectedFacilities, facilityName]
      : selectedFacilities.filter(name => name !== facilityName);
    setSelectedFacilities(updatedFacilities);
    setValue("features", updatedFacilities);
  };

  // Handle form submission
  const onSubmit = async (data: RoomData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name || "");
      formData.append("price", data.price ? data.price.toString() : "0");
      formData.append("shortdesc", data.shortdesc || "");
      formData.append("features", JSON.stringify(data.features || []));
      formData.append("capacity", data.capacity ? data.capacity.toString() : "0");
      formData.append("heading", data.heading || "");
      formData.append("longdesc", data.longdesc || "");
      if (selectedFile) {
        formData.append("roomImage", selectedFile);
      }

      if (roomTypeId) {
        await axiosInstance.put(`/api/roomType/${roomTypeId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/api/roomType", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/roomType", { replace: true });
    } catch (error) {
      console.error("Error submitting room type data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlineBedroomParent className="mr-2 text-blue-600" />
            {roomTypeId ? 'Edit Room Type' : 'Create Room Type'}
          </h2>
          <button
            onClick={() => navigate('/admin/roomType')}
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
                <Label name="name" label="Room Name" />
                <InputField
                  name="name"
                  type="text"
                  placeholder="Enter room name"
                  register={register}
                  required="Room name is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label name="capacity" label="Total Capacity" />
                <InputField
                  name="capacity"
                  type="number"
                  placeholder="Enter total capacity"
                  register={register}
                  required="Capacity is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
              </div>
              <div>
                <Label name="price" label="Room Price" />
                <InputField
                  name="price"
                  type="number"
                  placeholder="Enter room price"
                  register={register}
                  required="Price is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Features
            </h3>
            <div>
              <Label name="features" label="Select Facilities" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {facilities.map((facility) => (
                  <label key={facility._id} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      value={facility.name}
                      checked={selectedFacilities.includes(facility.name)}
                      onChange={(e) => handleFacilityChange(facility.name, e.target.checked)}
                      className="h-4 w-4 text-[#019cec] border-gray-300 rounded focus:ring-[#019cec]"
                    />
                    <span>{facility.name}</span>
                  </label>
                ))}
              </div>
              {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features.message}</p>}
                          
            </div>
          </div>

          {/* Descriptions Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Descriptions <span className="text-gray-500 text-sm">(for room pages)</span>
            </h3>
            <div className="space-y-6">
              <div>
                <Label name="heading" label="Room Heading" />
                <InputField
                  name="heading"
                  type="text"
                  placeholder="Enter room heading"
                  register={register}
                  required="Heading is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.heading && <p className="text-red-500 text-sm mt-1">{errors.heading.message}</p>}
              </div>
              <div>
                <Label name="shortdesc" label="Short Description"  />
                <InputField
                  name="shortdesc"
                  type="text"
                  placeholder="Enter short description"
                  register={register}
                  required="Short description is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.shortdesc && <p className="text-red-500 text-sm mt-1">{errors.shortdesc.message}</p>}
              </div>
              <div>
                <Label name="longdesc" label="Long Description"  />
                <textarea
                  placeholder="Enter long description"
                  {...register("longdesc", { required: "Long description is required" })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 text-sm"
                  rows={5}
                />
                {errors.longdesc && <p className="text-red-500 text-sm mt-1">{errors.longdesc.message}</p>}
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="mb-8 bg-[#e4e4f4] p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b-2 border-[#019cec] pb-2">
              Media
            </h3>
            <div>
              <Label name="roomImage" label="Room Image"  />
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
                    alt="Room Preview"
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
              onClick={() => navigate("/admin/roomType")}
              className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 font-poppins hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >
              {roomTypeId ? "Update Room Type" : "Create Room Type"}
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            This will also create a page for this room type.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomType;
