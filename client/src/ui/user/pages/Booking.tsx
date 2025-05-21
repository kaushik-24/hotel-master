// Modified BookingForm component with authorization handling
import { bookingSchema } from "@config/schema/booking.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookingFormData } from "@interface/booking.interface";
import axiosInstance from "@services/instance";
import Button from "@ui/common/atoms/Button";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import RoomSelector from "@ui/common/molecules/RoomSelector";
import { toast } from "@ui/common/organisms/toast/ToastManage";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

const BookingForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    // Get auth token from local storage or context if you're using one
    const getAuthToken = () => {
        return localStorage.getItem('authToken'); // Or however you store your auth token
    };

    const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>({
        resolver: yupResolver(bookingSchema()),
        defaultValues: {
            name: "",
            numberOfRoom: 1,
            rooms: [],
            checkInDate: "",
            checkOutDate: "",
        }
    });

    const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
        setIsLoading(true);
        try {
            // Get the auth token
            const token = getAuthToken();
            
            // Submit form data to the backend with proper authorization
            const response = await axiosInstance.post("/api/booking", data, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Add authorization header
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                toast.show({ title: "Success", content: "Booking successfully created", duration: 2000, type: 'success' });
            }
        } catch (error: any) {
            console.error("Error submitting booking form:", error);
            
            // More detailed error handling
            if (error.response) {
                // The server responded with a status code outside the 2xx range
                if (error.response.status === 403) {
                    toast.show({ 
                        title: "Authorization Error", 
                        content: "You don't have permission to create a booking. Please login again.", 
                        duration: 3000, 
                        type: 'error' 
                    });
                } else {
                    toast.show({ 
                        title: "Error", 
                        content: error.response.data?.message || "Booking creation failed", 
                        duration: 2000, 
                        type: 'error' 
                    });
                }
            } else if (error.request) {
                // The request was made but no response was received
                toast.show({ 
                    title: "Network Error", 
                    content: "Unable to connect to the server", 
                    duration: 2000, 
                    type: 'error' 
                });
            } else {
                // Something happened in setting up the request
                toast.show({ 
                    title: "Error", 
                    content: "An unexpected error occurred", 
                    duration: 2000, 
                    type: 'error' 
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#ffeedc] flex flex-col justify-center items-center px-4 py-4 w-full h-screen ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-[#dce8ff] p-10 w-full md:w-[50%] rounded-3xl ">
                <h2 className="text-[#5b3423] font-bold text-2xl mb-5">Book Your Stay</h2>

                {/* Name */}
                <div className="mb-4">
                    <Label name="name" label="Name" />
                    <InputField
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        register={register}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                {/* Number of Rooms */}
                <div className="mb-4">
                    <Label name="numberOfRoom" label="Number of Room" />
                    <InputField
                        name="numberOfRoom"
                        type="number"
                        placeholder="Enter number of rooms"
                        register={register}
                    />
                    {errors.numberOfRoom && <span className="text-red-500 text-sm">{errors.numberOfRoom.message}</span>}
                </div>

                {/* Room Selector */}
                <div className="mb-4">
                    <Label name="rooms" label="Rooms" />
                    <RoomSelector register={register} />
                    {errors.rooms && <span className="text-red-500 text-sm">{errors.rooms.message}</span>}
                </div>

                <div className=" flex flex-col lg:flex-row justify-between gap-4">
                    {/* Check-In Date */}
                    <div className="mb-4">
                        <Label name="checkInDate" label="Check-In Date" />
                        <InputField
                            name="checkInDate"
                            type="date"
                            register={register}
                        />
                        {errors.checkInDate && <span className="text-red-500 text-sm">{errors.checkInDate.message}</span>}
                    </div>

                    {/* Check-Out Date */}
                    <div className="mb-4">
                        <Label name="checkOutDate" label="Check-Out Date" />
                        <InputField
                            name="checkOutDate"
                            type="date"
                            register={register}
                        />
                        {errors.checkOutDate && <span className="text-red-500 text-sm">{errors.checkOutDate.message}</span>}
                    </div>
                </div>

                <Button
                    type="submit" 
                    buttonText={isLoading ? "Processing..." : "Book Now"} 
                />
            </form>
        </div>
    );
};

export default BookingForm;
