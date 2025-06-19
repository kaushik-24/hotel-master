import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

interface HallType {
  _id: string;
  name: string;
}

interface HallNumberData {
  hallNumber: string;
  hallType: string; // Store hall type name instead of ID
  floor: string;
}

const CreateHallNumber = () => {
  const navigate = useNavigate();
  const { hallNumberId } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<HallNumberData>({
    defaultValues: {
    },
  });
  const [hallTypes, setHallTypes] = useState<HallType[]>([]);

  // Fetch hall types from backend
  useEffect(() => {
    const fetchHallTypes = async () => {
      try {
        const response = await axiosInstance.get('/api/halls');
        const hallTypeData = response.data?.data;
        if (Array.isArray(hallTypeData)) {
          setHallTypes(hallTypeData);
        } else {
          console.error("Unexpected hall type data format");
        }
      } catch (error) {
        console.error("Error fetching hall types:", error);
      }
    };
    fetchHallTypes();
  }, []);

  // Fetch hall number data for editing
  useEffect(() => {
    const fetchHallNumberData = async () => {
      if (hallNumberId) {
        try {
          const response = await axiosInstance.get(`/api/hallNumber/${hallNumberId}`);
          const hallNumberData = response.data.data;
          setValue("hallNumber", hallNumberData.hallNumber || "");
          // Assuming the backend returns the hall type name or we fetch it separately
          setValue("hallType", hallNumberData.hallTypeName || ""); // Adjust based on backend response
          setValue("floor", hallNumberData.floor || "");
        } catch (error) {
          console.error("Error fetching hall number data:", error);
        }
      }
    };
    fetchHallNumberData();
  }, [hallNumberId, setValue]);

  // Handle form submission
  const onSubmit = async (data: HallNumberData) => {
    try {
      const payload = {
        hallNumber: data.hallNumber,
        hallType: data.hallType, // Send hall type name
        floor: data.floor,
      };

      if (hallNumberId) {
        await axiosInstance.put(`/api/hallNumber/${hallNumberId}`, payload);
      } else {
        await axiosInstance.post("/api/hallNumber", payload);
      }
      navigate("/admin/hotel/hallNumber", { replace: true });
    } catch (error) {
      console.error("Error submitting hall number data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MdOutlineBedroomParent className="mr-2 text-blue-600" />
            {hallNumberId ? 'Edit Hall' : 'Create Hall '}
          </h2>
          <button
            onClick={() => navigate('/admin/hotel/hallNumber')}
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
                <Label name="hallNumber" label="Hall Number" />
                <InputField
                  name="hallNumber"
                  type="text"
                  placeholder="Enter hall number"
                  register={register}
                  required="Hall number is required"
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20"
                />
                {errors.hallNumber && <p className="text-red-500 text-sm mt-1">{errors.hallNumber.message}</p>}
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
                <Label name="roomType" label="Hall Type" />
                <select
                  {...register("hallType", { required: "Hall type is required" })}
                  className="w-full bg-white p-3 border border-gray-300 rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 text-sm"
                >
                  <option value="">Select a hall type</option>
                  {hallTypes.map((hallType) => (
                    <option key={hallType._id} value={hallType.name}>
                      {hallType.name}
                    </option>
                  ))}
                </select>
                {errors.hallType && <p className="text-red-500 text-sm mt-1">{errors.hallType.message}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/hotel/hallNumber")}
              className="px-6 py-2 bg-gray-300 rounded-md text-gray-700 font-poppins hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >
              {hallNumberId ? "Update Hall " : "Create Hall "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHallNumber;
