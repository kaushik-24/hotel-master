import { useEffect, useState } from "react";
import { image } from "@config/constant/image";
import axiosInstance from "@services/instance";

interface PlacesAndSightsData {
  heading1: string;
  description: string;
  placesSightsImage: string;
}

const PlacesandSights = () => {
  const [placesData, setPlacesData] = useState<PlacesAndSightsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Places and Sights data
  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const response = await axiosInstance.get("/api/placesSights");
        setPlacesData(response.data.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch Places and Sights data");
        setLoading(false);
      }
    };

    fetchPlacesData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#5b3423] h-screen w-screen flex items-center justify-center">
        <p className="text-[#ffeedc] text-xl font-poppins">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#5b3423] h-screen w-screen flex items-center justify-center">
        <p className="text-[#ffeedc] text-xl font-poppins">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#5b3423] flex flex-col justify-center items-center md:flex-row w-full">
      <div>
        <img
          src={placesData?.placesSightsImage ? `${import.meta.env.VITE_APP_BASE_URL}${placesData.placesSightsImage}` : image?.places}
          alt="Places and Sights"
          className="w-96"
        />
      </div>

      <div className="py-20 px-5">
        
        <p className="text-[#ffeedc] font-nanum text-[55px] max-w-[600px] leading-[1.2] mb-2">
          {placesData?.heading1 || "Discover the best attractions in Kathmandu with us!"}
        </p>
        <p className="max-w-[600px] font-nanum text-[19px] text-[#ffeedc]">
          {placesData?.description ||
            "Nestled in the heart of the valley, Hotel Shambala serves as the perfect base to explore the city. Whether you seek cultural immersion or serene nature escapes, our location offers a gateway to the rich tapestry of experiences awaiting you just beyond our doors."}
        </p>
      </div>
    </div>
  );
};

export default PlacesandSights;
