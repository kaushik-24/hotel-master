import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

interface RoomData {
    name: string;
    price: number;
    shortdesc: string;
    features: string;
    roomImage: string;
    totalrooms: number; 
    heading: string;
    longdesc: string;
    // Add other fields as needed
}

const CreateRoom = () => {
    
    const navigate = useNavigate();
    const { roomId } = useParams(); // Get the roomId from the URL
    const { register, handleSubmit, setValue } = useForm<RoomData>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    useEffect(() => {
        const fetchRoomData = async () => {
            if (roomId) {
                try {
                    const response = await axiosInstance.get(`/api/room/${roomId}`);
                    console.log("Fetched room data:", response.data); // Log the entire response

                    // Update form values with fetched room data
                    setValue('name', response.data.data.name || ''); // Set default value if undefined
                    setValue('price', response.data.data.price || ''); 
                    setValue('shortdesc', response.data.data.shortdesc || '');                     
                    setValue('features', response.data.data.features || '');                     
                    setValue('totalrooms', response.data.data.totalrooms || '');                
                    setValue('heading', response.data.data.heading || '');                
                    setValue('longdesc', response.data.data.longdesc || '');                
                    if (response.data.data.roomImage) {
                        setImagePreview(`${import.meta.env.VITE_APP_BASE_URL}${response.data.data.roomImage}`); // Assuming roomImage is a URL
                    }
                        }

                catch (error) {
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
      const formData = new FormData();
      formData.append("name", data.name || "");
    formData.append("price", data.price ? data.price.toString() : "0");
    formData.append("shortdesc", data.shortdesc || "");
    formData.append("features", data.features || "");
    formData.append("totalrooms", data.totalrooms ? data.totalrooms.toString() : "0");
    formData.append("heading", data.heading || "");
    formData.append("longdesc", data.longdesc || "");
      
      if (selectedFile) {
        formData.append("roomImage", selectedFile); // Append the image file
      }
      console.log("Submitted name:", data.name);

      if (roomId) {
        await axiosInstance.put(`/api/room/${roomId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/api/room", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/rooms", { replace: true });
      console.log("Room submitted successfully");
    } 
            catch (error) {
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
                        register={register} 
                     />
                </div>


                {/* Room price */}
                <div className="mb-4">
                    <Label name="price" label="Room price" />
                    <InputField
                        name="price"
                        type="number"
                        placeholder="Enter room price"
                        register={register}                    
                    />
                </div>
                
                 {/* Room Heading */}
                <div className="mb-4">
                    <Label name="heading" label="Room heading" />
                    <InputField
                        name="heading"
                        type="text"
                        placeholder="Enter room heading"
                        register={register} 
                    />
                </div>
                
                {/* Room short description */}
                <div className="mb-4">
                    <Label name="shortdesc" label="Room short description" />
                    <InputField
                        name="shortdesc"
                        type="text"
                        placeholder="Enter room short description"
                        register={register} 
                    />
                </div>

                {/* Room long description */}
                <div className="mb-4">
                    <Label name="longdesc" label="Room long description" />
                    <InputField
                        name="longdesc"
                        type="text"
                        placeholder="Enter room long description"
                        register={register} 
                    />
                </div>

                {/* Room features*/}
                <div className="mb-4">
                    <Label name="features" label="Room features" />
                    <InputField
                        name="features"
                        type="text"
                        placeholder="Enter room features"
                        register={register}      
                    />
                </div>
        
                {/* Photo Upload */} 
        <div className="mb-4">
          <Label name="roomImage" label="Room Image" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#6b3aa3] file:text-white hover:file:bg-[#5a2e8a]"
          />
          {imagePreview && (
            <div className="mt-4 relative inline-block">
              <img
                src={imagePreview}
                alt="Room Preview"
                className="w-48 h-32 object-cover rounded-md"
              />
              <button
      type="button"
      onClick={() => {
        setImagePreview(null);
        setSelectedFile(null);
      }}
      className="absolute top-1 right-1 bg-red-600/80 text-white text-xs px-2 py-1 rounded hover:bg-red-700/90 shadow" aria-label="Remove image"
    >
     <FiX /> 
    </button>
            </div>
          )}
        </div> 
                {/* Submit Button */}
                <button type="submit" className="p-2 bg-[#019ece] rounded-md text-white font-poppins">
                    {roomId ? "Update Room" : "Create Room"}
                </button>
                <p className="mt-3">This will also create a page of this room.</p>
            </form>
        </div>
    );
};

export default CreateRoom;
