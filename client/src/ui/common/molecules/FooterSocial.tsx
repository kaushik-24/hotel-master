import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTripadvisor, FaWhatsapp } from "react-icons/fa";

interface SocialLinks {
    facebook: string;
    instagram: string;
    tripAdvisor: string;
    whatsApp: string;
}

const FooterSocial: React.FC = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLinks>({
        facebook: "das",
        instagram: "dasd",
        tripAdvisor: "dasd",
        whatsApp: "dasd",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSocialMediaLinks = async () => {
            try {
                const response = await axiosInstance.get("/api/social");
                console.log("API Response:", response.data);
                const data = response.data.data || {};
                setSocialLinks({
                    facebook: data.facebook || "",
                    instagram: data.instagram || "",
                    tripAdvisor: data.tripAdvisor || "",
                    whatsApp: data.whatsApp || "",
                });
            } catch (error) {
                console.error("Error fetching social media links:", error);
                setSocialLinks({ facebook: "", instagram: "", tripAdvisor: "", whatsApp: "" });
            } finally {
                setIsLoading(false);
            }
        };
        fetchSocialMediaLinks();
    }, []);

    if (isLoading) {
        return <div>Loading social links...</div>;
    }

    return (
        <div className="flex items-center justify-start gap-x-3 mt-1">
            {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <p>
                        <FaFacebookF className="text-[#6f4028] hover:text-black" />
                    </p>
                </a>
            )}
            {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <p>
                        <FaInstagram className="text-[#6f4028] hover:text-black" />
                    </p>
                </a>
            )}
            {socialLinks.tripAdvisor && (
                <a href={socialLinks.tripAdvisor} target="_blank" rel="noopener noreferrer">
                    <p>
                        <FaTripadvisor className="text-[#6f4028] hover:text-black" />
                    </p>
                </a>
            )}
            {socialLinks.whatsApp && (
                <a href={socialLinks.whatsApp} target="_blank" rel="noopener noreferrer">
                    <p>
                        <FaWhatsapp className="text-[#6f4028] hover:text-black" />
                    </p>
                </a>
            )}
        </div>
    );
};

export default FooterSocial;
