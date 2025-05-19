import axiosInstance from "@services/instance"; // Assuming this is your axios instance
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { toast } from "@ui/common/organisms/toast/ToastManage";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTripadvisor, FaTwitter, FaYoutube } from "react-icons/fa";

interface SocialMediaFormProps {
    facebook: string;
    instagram: string;
    linkedin: string;
    tripAdvisor: string;
    youtube: string;
    twitter: string;
    whatsApp: string
}

const SiteSocialMedia = () => {
    const { register, handleSubmit, setValue } = useForm<SocialMediaFormProps>();

    // Fetch social media data on component mount
    useEffect(() => {
        const fetchSocialMedia = async () => {
            try {
                const response = await axiosInstance.get("/social");

                // Populate form fields with the fetched data
                if (response.data) {
                    setValue("facebook", response.data.data.facebook || "");
                    setValue("instagram", response.data.data.instagram || "");
                    setValue("linkedin", response.data.data.linkedin || "");
                    setValue("youtube", response.data.data.youtube || "");
                    setValue("twitter", response.data.data.twitter || "");
                    setValue("tripAdvisor", response.data.data.tripAdvisor || "");
                    setValue("whatsApp", response.data.data.whatsApp || "");
                }

            } catch (error) {
                console.error("Error fetching social media data:", error);
            }
        };

        fetchSocialMedia();
    }, [setValue]);

    // Handle form submission for updating social media data
    const onSubmit = async (data: SocialMediaFormProps) => {
        try {
            const accessToken = sessionStorage.getItem("accessTokenHotelVenus");

            if (!accessToken) {
                throw new Error("Access token is missing");
            }

            const response = await axiosInstance.put("/social", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response);

            toast.show({ title: "Success", content: "Updated successfully", duration: 2000, type: 'success' });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.show({ title: "Unauthorized", content: "Session expired. Please log in again.", duration: 2000, type: 'error' });
                // Redirect to login page or handle re-authentication
                window.location.href = '/auth/login';
            } else {
                console.error("Error in the update request:", error);
                toast.show({ title: "Error", content: "Update unsuccessful", duration: 2000, type: 'error' });
            }
        }
    };


    return (
        <div className="w-80">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="relative mb-2">
                        <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="facebook" label="Facebook URL" />
                        <FaFacebookF className="absolute left-3 top-[40px] text-black" />
                        <InputField name="facebook" type="text" register={register} />
                    </div>
                    <hr className="mb-2" />

                    <div className="relative mb-2">
                        <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="instagram" label="Instagram URL" />
                        <FaInstagram className="absolute left-3 top-[40px] text-black" />
                        <InputField name="instagram" type="text" register={register} />
                    </div>
                    <hr className="mb-2" />

                    <div className="relative mb-2">
                        <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="linkedin" label="Linkedin URL" />
                        <FaLinkedin className="absolute left-3 top-[40px] text-black" />
                        <InputField name="linkedin" type="text" register={register} />
                    </div>
                    <hr className="mb-2" />

                    <div className="relative mb-2">
                        <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="tripAdvisor" label="Tripadvisor URL" />
                        <FaTripadvisor className="absolute left-3 top-[40px] text-black" />
                        <InputField name="tripAdvisor" type="text" register={register} />
                    </div>
                    <hr className="mb-2" />

                    <div className="relative mb-2">
                        <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="youtube" label="Youtube URL" />
                        <FaYoutube className="absolute left-3 top-[40px] text-black" />
                        <InputField name="youtube" type="text" register={register} />
                    </div>
                    <hr className="mb-2" />

                    <div className="relative mb-2">
                        <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="twitter" label="Twitter URL" />
                        <FaTwitter className="absolute left-3 top-[40px] text-black" />
                        <InputField name="twitter" type="text" register={register} />
                    </div>

                    <div className="relative mb-2">
                        <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="whatsApp" label="WhatsApp URL" />
                        <FaTwitter className="absolute left-3 top-[40px] text-black" />
                        <InputField name="whatsApp" type="text" register={register} />
                    </div>
                </div>

                <div className="bg-white flex justify-center items-center h-20 p-5 rounded-md shadow-md w-fit">
                    <button type="submit" className="p-2 bg-[#6b3aa3] rounded-md text-white font-poppins text-[0.875rem]">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiteSocialMedia;
