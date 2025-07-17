import { bookingSchema } from "@config/schema/booking.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookingFormData } from "@interface/booking.interface";
import axiosInstance from "@services/instance";
import RoomSelector from "@ui/common/molecules/RoomSelector";
import { toast } from "@ui/common/organisms/toast/ToastManage";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import RoomSelectorAdmin from "./roomSelectorAdmin";

const BookingForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTransition, setIsLoadingTransition] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string; price: number } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<BookingFormData>({
    resolver: yupResolver(bookingSchema()),
    defaultValues: {
      name: "",
      email: "",
      numberOfRoom: 1,
      rooms: [],
      roomNames: [],
      checkInDate: "",
      checkOutDate: "",
      roomPrice: 0,
    },
  });

  const onRoomSelect = (roomId: string, roomName: string, roomPrice: number) => {
    setIsLoadingTransition(true);
    setTimeout(() => {
      setSelectedRoom({ id: roomId, name: roomName, price: roomPrice });
      setValue("rooms", [roomId]);
      setValue("roomNames", [roomName]); // Use the displayed room name
      setValue("roomPrice", roomPrice);
      console.log('Selected Room:', { id: roomId, name: roomName, price: roomPrice });
      setIsLoadingTransition(false);
    }, 500);
  };

  const onCancel = () => {
    setIsLoadingTransition(true);
    setTimeout(() => {
      setSelectedRoom(null);
      setImagePreview(null);
      reset();
      setIsLoadingTransition(false);
    }, 500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    setIsLoading(true);
    try {

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("numberOfRoom", data.numberOfRoom.toString());
      formData.append("rooms", data.rooms?.[0] || "");
      formData.append("roomNames", data.roomNames?.[0] || selectedRoom?.name || ""); // Use displayed room name
      if (data.checkInDate) formData.append("checkInDate", data.checkInDate);
      if (data.checkOutDate) formData.append("checkOutDate", data.checkOutDate);
      formData.append("roomPrice", Number(data.roomPrice).toString());

      const imageInput = document.getElementById("idImage") as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append("idImage", imageInput.files[0]);
      } else {
        throw new Error("Please upload an ID image");
      }

      console.log('FormData:', {
        name: data.name,
        email: data.email,
        numberOfRoom: data.numberOfRoom,
        rooms: data.rooms?.[0],
        roomNames: data.roomNames?.[0],
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        roomPrice: data.roomPrice,
      });

      const response = await axiosInstance.post("/api/booking", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("Booking response:", JSON.stringify(response.data, null, 2));
        toast.show({
          title: "Success",
          content: response.data.message || "Booking successfully created",
          duration: 2000,
          type: "success",
        });
        onCancel();
      }
    } catch (error: any) {
      console.error("Error submitting booking form:", error);
      toast.show({
        title: "Error",
        content: error.response?.data?.message || error.message || "Booking creation failed",
        duration: 2000,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" min-h-screen grid grid-rows-[auto_1fr_auto] gap-4">
      <div className="container mx-auto p-2 sm:p-4 min-h-[600px] flex items-start justify-center">
        {isLoadingTransition ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="w-12 h-12 border-b-2  border-t-2 rounded-full animate-spin"></div>
          </div>
        ) : selectedRoom ? (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-[240px] mx-auto  rounded-lg shadow-sm shadow-[#5b3423] p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-bold text-[#5b3423] mb-3">
              Book {selectedRoom.name}
            </h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-[#5b3423] text-xs sm:text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full p-1.5 border border-[#5b3423] rounded-md text-xs sm:text-sm bg-[#ffeedc] text-[#5b3423]"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-[#5b3423] text-xs sm:text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full p-1.5 border border-[#5b3423] rounded-md text-xs sm:text-sm bg-[#ffeedc] text-[#5b3423]"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="idImage" className="block text-[#5b3423] text-xs sm:text-sm">
                  ID Image
                </label>
                <input
                  type="file"
                  id="idImage"
                  accept="image/jpeg,image/jpg,image/png"
                  capture="environment"
                  onChange={handleImageChange}
                  className="w-full p-1.5 border border-[#5b3423] rounded-md text-xs sm:text-sm bg-[#ffeedc] text-[#5b3423]"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="ID Preview" className="w-full h-32 object-cover rounded-md" />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="checkInDate" className="block text-[#5b3423] text-xs sm:text-sm">
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
          <RoomSelectorAdmin register={register} onRoomSelect={onRoomSelect} />
        )}
      </div>
      
    </div>
  );
};

export default BookingForm;

