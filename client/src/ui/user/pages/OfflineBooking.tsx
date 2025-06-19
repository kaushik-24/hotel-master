import { bookingSchema } from "@config/schema/booking.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookingFormData } from "@interface/booking.interface";
import axiosInstance from "@services/instance";
import RoomSelector from "@ui/common/molecules/RoomSelector";
import { toast } from "@ui/common/organisms/toast/ToastManage";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

const OfflineBookingForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTransition, setIsLoadingTransition] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string } | null>(null);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<BookingFormData>({
    resolver: yupResolver(bookingSchema()),
    defaultValues: {
      name: "",
      numberOfRoom: 1,
      rooms: [],
      roomNames: [],
      checkInDate: "",
      checkOutDate: "",
    },
  });

  const onRoomSelect = (roomId: string, roomName: string) => {
    setIsLoadingTransition(true);
    setTimeout(() => {
      setSelectedRoom({ id: roomId, name: roomName });
      setValue("rooms", [roomId]);
      setValue("roomNames", [roomName]);
      setIsLoadingTransition(false);
    }, 500);
  };

  const onCancel = () => {
    setIsLoadingTransition(true);
    setTimeout(() => {
      setSelectedRoom(null);
      reset();
      setIsLoadingTransition(false);
    }, 500);
  };

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    setIsLoading(true);
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post("/api/booking", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.show({ title: "Success", content: "Booking successfully created", duration: 2000, type: "success" });
        onCancel();
      }
    } catch (error: any) {
      console.error("Error submitting booking form:", error);
      if (error.response) {
        if (error.response.status === 403) {
          toast.show({
            title: "Authorization Error",
            content: "You don't have permission to create a booking. Please login again.",
            duration: 3000,
            type: "error",
          });
        } else {
          toast.show({
            title: "Error",
            content: error.response.data?.message || "Booking creation failed",
            duration: 2000,
            type: "error",
          });
        }
      } else if (error.request) {
        toast.show({
          title: "Network Error",
          content: "Unable to connect to the server",
          duration: 2000,
          type: "error",
        });
      } else {
        toast.show({
          title: "Error",
          content: "An unexpected error occurred",
          duration: 2000,
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      <div className="container mx-auto p-2 sm:p-4 min-h-[600px] flex items-start justify-center">
        {isLoadingTransition ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="w-12 h-12 border-b-2  border-t-2 rounded-full animate-spin"></div>
          </div>
        ) : selectedRoom ? (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-[240px] mx-auto bg-[#e4e4f4] rounded-lg shadow-sm  p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-bold  mb-3">
              Book {selectedRoom.name}
            </h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full p-1.5 border  rounded-md text-xs sm:text-sm bg-[#ffeedc] "
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="checkInDate" className="block  text-xs sm:text-sm">
                  Check-In Date
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  {...register("checkInDate")}
                  className="w-full p-1.5 border border-[#5b3423] rounded-md text-xs sm:text-sm bg-[#ffeedc] text-[#5b3423]"
                />
                {errors.checkInDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.checkInDate.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="checkOutDate" className="block text-[#5b3423] text-xs sm:text-sm">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  {...register("checkOutDate")}
                  className="w-full p-1.5 border border-[#5b3423] rounded-md text-xs sm:text-sm bg-[#ffeedc] text-[#5b3423]"
                />
                {errors.checkOutDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.checkOutDate.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="numberOfRoom" className="block text-[#5b3423] text-xs sm:text-sm">
                  Number of Rooms
                </label>
                <select
                  id="numberOfRoom"
                  {...register("numberOfRoom")}
                  className="w-full p-1.5 border border-[#5b3423] rounded-md text-xs sm:text-sm bg-[#ffeedc] text-[#5b3423]"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                {errors.numberOfRoom && (
                  <p className="text-red-500 text-xs mt-1">{errors.numberOfRoom.message}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-1/3 bg-[#5b3423] text-[#ffeedc] font-semibold py-1.5 text-xs sm:text-sm rounded-lg hover:bg-[#f6e6d6] hover:text-[#5b3423] transition-colors duration-200 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Submitting..." : "Confirm Booking"}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-1/3 bg-[#f6e6d6] text-[#5b3423] font-semibold py-1.5 text-xs sm:text-sm rounded-lg hover:bg-[#5b3423] hover:text-[#ffeedc] transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-1/3 bg-[#f6e6d6] text-[#5b3423] font-semibold py-1.5 text-xs sm:text-sm rounded-lg hover:bg-[#5b3423] hover:text-[#ffeedc] transition-colors duration-200"
                >
                  Back to Rooms
                </button>
              </div>
            </div>
          </form>
        ) : (
          <RoomSelector register={register} onRoomSelect={onRoomSelect} />
        )}
      </div>
    </div>
  );
};

export default OfflineBookingForm;

