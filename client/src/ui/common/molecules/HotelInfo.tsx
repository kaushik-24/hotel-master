import axiosInstance from "@services/instance"; // Adjust the import based on your project structure
import { toast } from "@ui/common/organisms/toast/ToastManage"; // Adjust the import based on your project structure
import { useEffect, useState } from "react";
import { MdOutlineLocationOn, MdOutlineMail, MdOutlinePhone, MdOutlineWhatsapp } from "react-icons/md";

// Define the SiteInfo interface
interface SiteInfo {
    enquiryEmail: string;
    contactEmail: string;
    address: string;
    phoneNumbers: string[]; // Assuming phoneNumbers is an array of strings
    whatsapp: string;
}

const HotelInfo = () => {
    const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null); // Use the SiteInfo type

    // Fetch site info data on component mount
    useEffect(() => {
        const fetchSiteInfo = async () => {
            try {
                const response = await axiosInstance.get("/api/siteInfo");

                if (response.data) {
                    setSiteInfo(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching site info data:", error);
                toast.show({ title: "Error", content: "Failed to load site information", duration: 2000, type: "error" });
            }
        };

        fetchSiteInfo();
    }, []);

    if (!siteInfo) return <p>Loading...</p>; // Optional loading state

    return (
        <div className="flex flex-col gap-y-1 font-poppins text-[17px] text-[#ffeedc]">
            <div className="mb-3">
                <h1 className="uppercase font-poppins text-[14px] tracking-widest ">kathmandu office</h1>
                <p className="flex items-center gap-x-2">
                    <MdOutlineLocationOn /> {siteInfo.address}
                </p>
                <p className="flex items-center gap-x-2">
                    <MdOutlinePhone />
                    {siteInfo.phoneNumbers.map((phone, index) => (
                        <span key={index} className="hover:underline cursor-pointer">
                            {phone}
                            {index < siteInfo.phoneNumbers.length - 1 ? " / " : ""}
                        </span>
                    ))}
                </p>
                <p className="flex items-center gap-x-2">
                    <MdOutlineWhatsapp />
                    {siteInfo.whatsapp}
                </p>
            </div>

            <div className="mb-3">
                <p className="uppercase font-poppins text-[14px] tracking-widest ">For general enquiries please contact:</p>
                <p className="flex items-center gap-x-2 hover:underline cursor-pointer">
                    <MdOutlineMail />
                    {siteInfo.contactEmail}
                </p>
            </div>

            <div className="mb-3">
                <p className="uppercase font-poppins text-[14px] tracking-widest ">For corporate or group please contact:</p>
                <p className="flex items-center gap-x-2 hover:underline cursor-pointer">
                    <MdOutlineMail />
                    sales@venushotel.com
                </p>
            </div>
        </div>
    );
};

export default HotelInfo;
