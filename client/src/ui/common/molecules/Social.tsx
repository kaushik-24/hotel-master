import axiosInstance from "@services/instance"; // Adjust this import based on your axios instance
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTripadvisor, FaWhatsapp } from "react-icons/fa";

interface SocialLinks {
    facebook?: string;
    instagram?: string;
    tripAdvisor?: string;
    whatsApp?: string;
}

const Social: React.FC = () => {
    const [socialLinks, setSocialLinks] = useState<SocialLinks>({
        facebook: "example@facebook",
        instagram: "example@instagram",
        tripAdvisor: "example@tripAdvisor",
        whatsApp: "example@whatsApp",
    });

    // Fetch the social media links from the API
    useEffect(() => {
        const fetchSocialMediaLinks = async () => {
            try {
                const response = await axiosInstance.get("/api/social"); // Adjust the API endpoint
                setSocialLinks(response.data.data);
                console.log(response);

            } catch (error) {
                console.error("Error fetching social media links:", error);
            }
        };
        fetchSocialMediaLinks();
    }, []);

    return (
        <div className="flex items justify-center gap-x-3 ">
            {/* Facebook */}
            {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <p className="bg-[#6f4028] rounded-full p-2 hover:bg-white hover:text-black">
                        <FaFacebookF className="text-[#ffeedc] hover:text-black" />
                    </p>
                </a>
            )}

            {/* Instagram */}
            {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <p className="bg-[#6f4028] rounded-full p-2 hover:bg-white hover:text-black">
                        <FaInstagram className="text-[#ffeedc] hover:text-black" />
                    </p>
                </a>
            )}

            {/* TripAdvisor */}
            {socialLinks.tripAdvisor && (
                <a href={socialLinks.tripAdvisor} target="_blank" rel="noopener noreferrer">
                    <p className="bg-[#6f4028] rounded-full p-2 hover:bg-white hover:text-black">
                        <FaTripadvisor className="text-[#ffeedc] hover:text-black" />
                    </p>
                </a>
            )}

            {/* WhatsApp */}
            {socialLinks.whatsApp && (
                <a href={socialLinks.whatsApp} target="_blank" rel="noopener noreferrer">
                    <p className="bg-[#6f4028] rounded-full p-2 hover:bg-white hover:text-black">
                        <FaWhatsapp className="text-[#ffeedc] hover:text-black" />
                    </p>
                </a>
            )}
        </div>
    );
};

export default Social;
