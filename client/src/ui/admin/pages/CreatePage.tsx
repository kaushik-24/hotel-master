import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface PageData {
    name: string;
    slug: string;
    // Add other fields as needed for the page
}

const CreatePage = () => {
    const { pageId } = useParams(); // Get the pageId from the URL if editing
    const { register, handleSubmit, setValue } = useForm<PageData>();

    useEffect(() => {
        const fetchPageData = async () => {
            if (pageId) {
                try {
                    const response = await axiosInstance.get(`/page/${pageId}`);
                    console.log("Fetched page data:", response.data); // Log the entire response

                    // Update form values with fetched page data
                    setValue('name', response.data.data.name || ''); // Set default value if undefined
                    setValue('slug', response.data.data.slug || ''); // Set default value if undefined
                    // Include other fields here and set default values
                } catch (error) {
                    console.error("Error fetching page data:", error);
                }
            }
        };

        fetchPageData();
    }, [pageId, setValue]); // Ensure this only runs when pageId changes

    const onSubmit = async (data: PageData) => {
        try {
            if (pageId) {
                // Update existing page
                await axiosInstance.put(`/page/${pageId}`, data);
            } else {
                // Create new page
                await axiosInstance.post("/page", data);
            }
            // Handle success, redirect or display success message
            console.log("Page submitted successfully");
        } catch (error) {
            console.error("Error submitting page data:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-medium mb-4">{pageId ? "Edit Page" : "Create Page"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Page Title */}
                <div className="mb-4">
                    <Label name="title" label="Page Title" />
                    <InputField
                        name="name"
                        type="text"
                        placeholder="Enter page title"
                        register={register} // Use register for input binding
                    />
                </div>

                {/* Page Slug */}
                <div className="mb-4">
                    <Label name="slug" label="Page Slug" />
                    <InputField
                        name="slug"
                        type="text"
                        placeholder="Enter page slug"
                        register={register} // Use register for input binding
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="p-2 bg-[#6b3aa3] rounded-md text-white font-poppins">
                    {pageId ? "Update Page" : "Create Page"}
                </button>
            </form>
        </div>
    );
};

export default CreatePage;
