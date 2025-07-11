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
      <div className="bg-[#5b3423] min-h-screen w-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png')] opacity-10"></div>
        <p className="text-[#ffeedc] text-2xl font-poppins font-medium animate-pulse z-10">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#5b3423] min-h-screen w-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png')] opacity-10"></div>
        <p className="text-[#ffeedc] text-2xl font-poppins font-medium z-10">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-[#5b3423] w-full min-h-screen flex flex-col md:flex-row justify-center items-center py-12 px-4 relative overflow-hidden">
      {/* Image Section */}
      <div className="relative z-10 mb-8 md:mb-0 md:mr-8">
        <img
          src={placesData?.placesSightsImage ? `${import.meta.env.VITE_APP_BASE_URL}${placesData.placesSightsImage}` : image?.places}
          alt="Places and Sights"
          className="w-full max-w-[400px] md:w-[450px] h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 object-cover"
        />
        
      </div>

      {/* Text Section */}
      <div className="relative z-10 max-w-[600px] py-12 px-5 md:px-8">
        <h2 className="text-[#ffeedc] font-nanum text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 tracking-tight">
          {placesData?.heading1 || "Discover the best attractions in Kathmandu with us!"}
        </h2>
        <p className="text-[#ffeedc] font-nanum text-lg md:text-xl leading-relaxed opacity-90">
          {placesData?.description ||
            "Nestled in the heart of the valley, Hotel Shambala serves as the perfect base to explore the city. Whether you seek cultural immersion or serene nature escapes, our location offers a gateway to the rich tapestry of experiences awaiting you just beyond our doors."}
        </p>
      </div>
    </section>
  );
};

export default PlacesandSights;
