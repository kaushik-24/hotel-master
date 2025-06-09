import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

interface PageData {
    name: string;
    price: number;
    shortdesc: string;
    pageImage: string;
    heading: string;
    longdesc: string;
    // Add other fields as needed
}

const CreatePage = () => {
    
    const navigate = useNavigate();
    const { pageId } = useParams(); // Get the roomId from the URL
    const { register, handleSubmit, setValue } = useForm<PageData>();
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
        const fetchPageData = async () => {
            if (pageId) {
                try {
                    const response = await axiosInstance.get(`/api/page/${pageId}`);
                    console.log("Fetched page data:", response.data); // Log the entire response

                    // Update form values with fetched room data
                    setValue('name', response.data.data.name || ''); // Set default value if undefined
                    setValue('shortdesc', response.data.data.shortdesc || '');                     
                    setValue('heading', response.data.data.heading || '');                
                    setValue('longdesc', response.data.data.longdesc || '');                
                    if (response.data.data.pageImage) {
                        setImagePreview(`${import.meta.env.VITE_APP_BASE_URL}${response.data.data.pageImage}`); // Assuming roomImage is a URL
                    }
                        }

                catch (error) {
                    console.error("Error fetching page data:", error);
                }
            }
        };

        fetchPageData();
    }, [pageId, setValue]); // Ensure this only runs when roomId changes
    
    useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview); // Clean up preview URL
    };
  }, [imagePreview]);

    const onSubmit = async (data: PageData) => {
        try {
      const formData = new FormData();
      formData.append("name", data.name || "");
      formData.append("shortdesc", data.shortdesc || "");
      formData.append("heading", data.heading || "");
      formData.append("longdesc", data.longdesc || "");
      console.log("Submitted data:", data);
      
      if (selectedFile) {
        formData.append("pageImage", selectedFile); // Append the image file
      }
      for (let [key, value] of formData.entries()) {
  console.log(`${key}: ${value}`);
}
      if (pageId) {
        await axiosInstance.put(`/api/page/${pageId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/api/page", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/admin/pages", { replace: true });
      console.log("Page submitted successfully");
    } 
            catch (error) {
            console.error("Error submitting page data:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-medium mb-4">{pageId ? "Edit Page" : "Create Page"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Page Name */}
                <div className="mb-4">
                    <Label name="name" label="Page Name" />
                    <InputField
                        name="name"
                        type="text"
                        placeholder="Enter page name"
                        register={register} // Use register for input binding
                    />
                </div>

                 {/* Page Heading */}
                <div className="mb-4">
                    <Label name="heading" label="Page heading" />
                    <InputField
                        name="heading"
                        type="text"
                        placeholder="Enter page heading"
                        register={register} 
                    />
                </div>
                
                {/* Page short description */}
                <div className="mb-4">
                    <Label name="shortdesc" label="Page short description" />
                    <InputField
                        name="shortdesc"
                        type="text"
                        placeholder="Enter page short description"
                        register={register} 
                    />
                </div>

                {/* Page long description */}
                <div className="mb-4">
                    <Label name="longdesc" label="Page long description" />
                    <InputField
                        name="longdesc"
                        type="text"
                        placeholder="Enter page long description"
                        register={register} 
                    />
                </div>
        
                {/* Photo Upload */} 
        <div className="mb-4">
          <Label name="roomImage" label="Page Image" />
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
                alt="Page Preview"
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
                    {pageId ? "Update Page" : "Create Page"}
                </button>
                <p className="mt-3">This will also create a page.</p>
            </form>
        </div>
    );
};

export default CreatePage;

