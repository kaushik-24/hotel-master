import axiosInstance from "@services/instance";
import InputField from "@ui/common/atoms/InputField";
import Label from "@ui/common/atoms/Label";
import { toast } from "@ui/common/organisms/toast/ToastManage";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";

interface SiteInfoForm {
    enquiryEmail: string;
    contactEmail: string;
    address: string;
    phoneNumbers: { number: string }[];
    whatsapp: string;
}

const SiteInfoSection = () => {
    const { register, handleSubmit, setValue } = useForm<SiteInfoForm>();
    const [phoneNumbers, setPhoneNumbers] = useState([{ number: "" }]);
    const [refresh, setRefresh] = useState(false); // Added state variable for refresh

    // Fetch site info data on component mount or when refresh changes
    useEffect(() => {
        const fetchSiteInfo = async () => {
            try {
                const response = await axiosInstance.get("/siteInfo");

                if (response.data) {
                    const siteInfo = response.data.data;
                    setValue("enquiryEmail", siteInfo.enquiryEmail || "");
                    setValue("contactEmail", siteInfo.contactEmail || "");
                    setValue("address", siteInfo.address || "");
                    setValue("whatsapp", siteInfo.whatsapp || "");

                    // Populate phone numbers properly
                    setPhoneNumbers(
                        siteInfo.phoneNumbers.length > 0
                            ? siteInfo.phoneNumbers.map((num: string) => ({ number: num }))
                            : [{ number: "" }]
                    );
                }
                console.log(response);
            } catch (error) {
                console.error("Error fetching site info data:", error);
            }
        };

        fetchSiteInfo();
    }, [setValue, refresh]); // Added refresh as a dependency

    // Handle form submission
    const onSubmit: SubmitHandler<SiteInfoForm> = async (data) => {
        try {
            const accessToken = sessionStorage.getItem("accessTokenHotelVenus");

            // Combine the phone numbers into the data object before sending
            const payload = {
                ...data,
                phoneNumbers: phoneNumbers.map(phone => phone.number) // Ensure it's an array of strings
            };

            const response = await axiosInstance.put("/siteInfo", payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            toast.show({ title: "Success", content: "Updated successfully", duration: 2000, type: "success" });
            console.log(response);
            setRefresh(true); // Trigger refresh after successful update
        } catch (error) {
            console.error("Error updating site info:", error);
            toast.show({ title: "Error", content: "Update failed", duration: 2000, type: "error" });
        }
    };

    // Add a new phone number field
    const handleAddPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, { number: "" }]);
    };

    // Delete a phone number field
    const handleDeletePhoneNumber = (index: number) => {
        const updatedPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(updatedPhoneNumbers);
    };

    // Handle input change for phone number fields
    const handlePhoneNumberChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPhoneNumbers = [...phoneNumbers];
        updatedPhoneNumbers[index].number = event.target.value;
        setPhoneNumbers(updatedPhoneNumbers);
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="enquiryEmail" label="Enquiry Email" />
                    <InputField name="enquiryEmail" type="email" register={register} />
                </div>
                <div className="mb-4">
                    <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="contactEmail" label="Contact Email" />
                    <InputField name="contactEmail" type="email" register={register} />
                </div>

                <div className="mb-4">
                    <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="address" label="Address" />
                    <InputField name="address" type="text" register={register} />
                </div>

                <div className="mb-4">
                    <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="whatsapp" label="WhatsApp Number" />
                    <InputField name="whatsapp" type="text" register={register} />
                </div>

                {/* Phone Number Section */}
                <div className="mb-4">
                    <Label textSize="text-sm" fontSize="font-normal" textColor="text-black" name="phoneNumbers" label="Phone Numbers" />

                    {phoneNumbers.map((phone, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4">
                            {/* Phone Number Input with custom InputField */}
                            <InputField
                                name={`phoneNumbers[${index}].number`}
                                type="text"
                                value={phone.number} // Pass the value
                                onChange={(event) => handlePhoneNumberChange(index, event)} // Handle changes
                                placeholder="Enter phone number"
                            />
                            {/* Add & Delete Buttons */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleAddPhoneNumber}
                                    className="bg-[#6b3aa3] hover:bg-[#713dad] text-white px-[0.6rem] py-[0.47rem] rounded-md"
                                >
                                    <IoAddCircleOutline />
                                </button>
                                {phoneNumbers.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleDeletePhoneNumber(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-[0.6rem] py-[0.47rem] rounded-md"
                                    >
                                        <IoTrashOutline />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
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

export default SiteInfoSection;
