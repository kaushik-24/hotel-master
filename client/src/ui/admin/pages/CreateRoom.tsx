import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface RoomData {
    name: string;
    price: number;
    shortdesc: string;
    features: [string];
    roomImage: string;
    totalrooms: number; 
    // Add other fields as needed
}

const CreateRoom = () => {
    
    const navigate = useNavigate();
    const { roomId } = useParams(); // Get the roomId from the URL
    const { register, handleSubmit, setValue } = useForm<RoomData>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
   {/*} 
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setSelectedFile(file);
      setValue("roomImage", file); // Temporarily store the File; adjust based on backend needs
    } else {
      alert("Please select a valid image file.");
    }
  };{*/}
    useEffect(() => {
        const fetchRoomData = async () => {
            if (roomId) {
                try {
                    const response = await axiosInstance.get(`/api/room/${roomId}`);
                    console.log("Fetched room data:", response.data); // Log the entire response

                    // Update form values with fetched room data
                    setValue('name', response.data.data.name || ''); // Set default value if undefined
                    setValue('price', response.data.data.price || ''); // Set default value if undefined
                    setValue('shortdesc', response.data.data.shortdesc || ''); // Set default value if undefined
                    setValue('features', response.data.data.features || ''); // Set default value if undefined
                    setValue('totalrooms', response.data.data.totalrooms || ''); // Set default value if undefined
                    // Include other fields here and set default values
                } catch (error) {
                    console.error("Error fetching room data:", error);
                }
            }
        };

        fetchRoomData();
    }, [roomId, setValue]); // Ensure this only runs when roomId changes
    
    useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview); // Clean up preview URL
    };
  }, [imagePreview]);

    const onSubmit = async (data: RoomData) => {
        try {
            if (roomId) {
                // Update existing room
                await axiosInstance.put(`/api/room/${roomId}`, data);
            } else {
                // Create new room
                await axiosInstance.post("/api/room", data);
            }
             navigate('/admin/rooms', { replace: true });

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
                
                {/*Total  Room */}
                <div className="mb-4">
                    <Label name="totalrooms" label="Total rooms" />
                    <InputField
                        name="totalrooms"
                        type="number"
                        placeholder="Enter total number of rooms"
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
                
                {/* Room short description */}
                <div className="mb-4">
                    <Label name="shortdesc" label="Room short description" />
                    <InputField
                        name="shortdesc"
                        type="text"
                        placeholder="Enter room short description"
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
        
                {/* Photo Upload 
        <div className="mb-4">
          <Label name="roomImage" label="Room Image" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#6b3aa3] file:text-white hover:file:bg-[#5a2e8a]"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Room Preview"
                className="w-48 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div> */}

                {/* Submit Button */}
                <button type="submit" className="p-2 bg-[#6b3aa3] rounded-md text-white font-poppins">
                    {roomId ? "Update Room" : "Create Room"}
                </button>
            </form>
        </div>
    );
};

export default CreateRoom;
