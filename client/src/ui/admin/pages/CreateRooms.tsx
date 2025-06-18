import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

interface RoomType {
  _id: string;
  name: string;
}

interface RoomData {
  roomNumber: string;
  roomType: string; // Store room type name instead of ID
  floor: string;
}

const CreateRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RoomData>({
    defaultValues: {
    },
  });
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  // Fetch room types from backend
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axiosInstance.get('/api/roomType');
        const roomTypeData = response.data?.data;
        if (Array.isArray(roomTypeData)) {
          setRoomTypes(roomTypeData);
        } else {
          console.error("Unexpected room type data format");
        }
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };
    fetchRoomTypes();
  }, []);

  // Fetch room data for editing
  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomId) {
        try {
          const response = await axiosInstance.get(`/api/room/${roomId}`);
          const roomData = response.data.data;
          setValue("roomNumber", roomData.roomNumber || "");
          // Assuming the backend returns the room type name or we fetch it separately
          setValue("roomType", roomData.roomTypeName || ""); // Adjust based on backend response
          setValue("floor", roomData.floor || "");
        } catch (error) {
          console.error("Error fetching room data:", error);
        }
      }
    };
    fetchRoomData();
  }, [roomId, setValue]);

  // Handle form submission
  const onSubmit = async (data: RoomData) => {
    try {
      const payload = {
        roomNumber: data.roomNumber,
        roomType: data.roomType, // Send room type name
        floor: data.floor,
      };

      if (roomId) {
        await axiosInstance.put(`/api/room/${roomId}`, payload);
      } else {
        await axiosInstance.post("/api/room", payload);
      }
      navigate("/admin/hotel/rooms", { replace: true });
    } catch (error) {
      console.error("Error submitting room data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlineBedroomParent className="mr-2 text-blue-600" />
            {roomId ? 'Edit Room' : 'Create Room'}
          </h2>
          <button
            onClick={() => navigate('/admin/hotel/rooms')}
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
                <Label name="roomNumber" label="Room Number" />
                <InputField
                  name="roomNumber"
                  type="text"
                  placeholder="Enter room number"
                  register={register}
                  required="Room number is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.roomNumber && <p className="text-red-500 text-sm mt-1">{errors.roomNumber.message}</p>}
              </div>
              <div>
                <Label name="floor" label="Floor" />
                <InputField
                  name="floor"
                  type="text"
                  placeholder="Enter floor number"
                  register={register}
                  required="Floor is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.floor && <p className="text-red-500 text-sm mt-1">{errors.floor.message}</p>}
              </div>
              <div>
                <Label name="roomType" label="Room Type" />
                <select
                  {...register("roomType", { required: "Room type is required" })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 text-sm"
                >
                  <option value="">Select a room type</option>
                  {roomTypes.map((roomType) => (
                    <option key={roomType._id} value={roomType.name}>
                      {roomType.name}
                    </option>
                  ))}
                </select>
                {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType.message}</p>}
              </div>
              
              
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/hotel/rooms")}
              className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 font-poppins hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >
              {roomId ? "Update Room" : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
