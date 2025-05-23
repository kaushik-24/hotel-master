import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface RoomData {
    name: string;
    price: number;
    description: string;
    features: string;
    // Add other fields as needed
}

const CreateRoom = () => {
    const { roomId } = useParams(); // Get the roomId from the URL
    const { register, handleSubmit, setValue } = useForm<RoomData>();

    useEffect(() => {
        const fetchRoomData = async () => {
            if (roomId) {
                try {
                    const response = await axiosInstance.get(`/api/room/${roomId}`);
                    console.log("Fetched room data:", response.data); // Log the entire response

                    // Update form values with fetched room data
                    setValue('name', response.data.data.name || ''); // Set default value if undefined
                    setValue('price', response.data.data.price || ''); // Set default value if undefined
                    setValue('description', response.data.data.description || ''); // Set default value if undefined
                    setValue('features', response.data.data.features || ''); // Set default value if undefined
                    // Include other fields here and set default values
                } catch (error) {
                    console.error("Error fetching room data:", error);
                }
            }
        };

        fetchRoomData();
    }, [roomId, setValue]); // Ensure this only runs when roomId changes

    const onSubmit = async (data: RoomData) => {
        try {
            if (roomId) {
                // Update existing room
                await axiosInstance.put(`/api/room/${roomId}`, data);
            } else {
                // Create new room
                await axiosInstance.post("/api/room", data);
            }
            // Handle success, redirect or display success message
            console.log("Room submitted successfully");
        } catch (error) {
            console.error("Error submitting room data:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-medium mb-4">{roomId ? "Edit Room" : "Create Room"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Room Name */}
                <div className="mb-4">
                    <Label name="name" label="Room Name" />
                    <InputField
                        name="name"
                        type="text"
                        placeholder="Enter room name"
                        register={register} // Use register for input binding
                    />
                </div>

                {/* Room price */}
                <div className="mb-4">
                    <Label name="price" label="Room price" />
                    <InputField
                        name="price"
                        type="number"
                        placeholder="Enter room price"
                        register={register} // Use register for input binding
                    />
                </div>
                
                {/* Room description */}
                <div className="mb-4">
                    <Label name="description" label="Room description" />
                    <InputField
                        name="description"
                        type="text"
                        placeholder="Enter room description"
                        register={register} // Use register for input binding
                    />
                </div>
 
                {/* Room features*/}
                <div className="mb-4">
                    <Label name="features" label="Room features" />
                    <InputField
                        name="features"
                        type="text"
                        placeholder="Enter room features"
                        register={register} // Use register for input binding
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="p-2 bg-[#6b3aa3] rounded-md text-white font-poppins">
                    {roomId ? "Update Room" : "Create Room"}
                </button>
            </form>
        </div>
    );
};

export default CreateRoom;
