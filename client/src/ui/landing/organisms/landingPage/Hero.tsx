import React, { useState, useEffect } from "react";
import { image } from "@config/constant/image"; // Keep the fallback image import
import axiosInstance from "@services/instance";

interface HeroData {
  heading1: string;
  heading2: string;
  heroImage: string;
}

const Hero: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axiosInstance.get("/api/hero");
        setHeroData(response.data.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch hero section data");
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#f0e0cf] h-screen w-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f0e0cf] h-screen w-screen flex items-center justify-center">
        <p className="text-white text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f0e0cf] h-screen w-screen relative">
      <img
        src={`${import.meta.env.VITE_APP_BASE_URL}${heroData?.heroImage}`} // Use fetched image or fallback
        alt="Hero in Navbar"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-56 right-10 transform -translate-y-1/2 text-center max-w-md px-4 py-3 rounded">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-serif drop-shadow-lg">
          {heroData?.heading1 || "Find Yourself at Venus"} {/* Use fetched heading or fallback */}
        </h1>
        <p className="text-white text-lg sm:text-1xl md:text-2xl mt-3 drop-shadow-md">
          {heroData?.heading2 || "Your Peaceful Oasis in Kathmandu"} {/* Use fetched heading or fallback */}
        </p>
      </div>
    </div>
  );
};

export default Hero;
