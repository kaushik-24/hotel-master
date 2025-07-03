import { useEffect, useState } from "react";
import axiosInstance from "@services/instance";
import RoomDescription from "@ui/landing/atoms/RoomDescription";
import RoomHeading from "@ui/landing/atoms/RoomHeading";
import RoomSlogan from "@ui/landing/atoms/RoomSlogan";

interface AboutUsData {
  subtitle: string;
  heading1: string;
  heading2: string;
  description: string;
  aboutUsImage: File | string; // Base64 encoded image
}

const IntroAboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch About Us data
  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/aboutUs");
        if (response.data.success && response.data.data) {
          setAboutUsData(response.data.data);
        } else {
          setError("No About Us data found");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch About Us data");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error || !aboutUsData) {
    return <div className="text-center py-10 text-red-500">{error || "No data available"}</div>;
  }

  return (
    <div className="bg-[#f6e6d6] flex flex-col justify-center">
      <div>
        <RoomHeading
          headingText={<>{aboutUsData.heading1}</>}
          headingSize="text-[55px] md:text-[66px]"
        />
        <RoomSlogan slogan={aboutUsData.subtitle} />
      </div>

      <div className="bg-[#ffeedc]">
        <div className="px-5 md:px-20 py-5 object-cover">
          {aboutUsData.aboutUsImage ? (
            <img src={`${import.meta.env.VITE_APP_BASE_URL}${aboutUsData.aboutUsImage}`} alt="About Us" />
          ) : (
            <div className="text-center text-gray-500">No image available</div>
          )}
        </div>
      </div>

      <div className="flex flex-col bg-[#ffeedc]">
        <RoomHeading
          headingText={<>{aboutUsData.heading2}</>}
          headingSize="text-[32px] md:text-[42px]"
        />

        <div className="flex justify-center items-center flex-col md:flex-row gap-y-5 md:gap-x-5 px-10 w-full my-10">
          <p className="text-[17px] font-poppins max-w-[445px]">
            {aboutUsData.description}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default IntroAboutUs;
