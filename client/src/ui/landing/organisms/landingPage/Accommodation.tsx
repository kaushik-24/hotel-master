import { useEffect, useState } from "react";
import RoomsCarousel from "@ui/landing/molecules/RoomsCarousal";
import axiosInstance from "@services/instance";

interface AccommodationData {
  heading: string;
}

const Accommodation = () => {
  const [accommodationData, setAccommodationData] = useState<AccommodationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Accommodation data
  useEffect(() => {
    const fetchAccommodationData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/accommodation");
        setAccommodationData(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch Accommodation data");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#ffeedc] py-10">
        <div className="px-44 mb-10">
          <p className="text-center text-[#5b3423] font-poppins text-[14px]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !accommodationData) {
    return (
      <div className="bg-[#ffeedc] py-10">
        <div className="px-44 mb-10">
          <p className="text-center text-[#5b3423] font-poppins text-[14px]">{error || "No accommodation data available"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ffeedc] py-10 accomodation-svg">
      <div className="w-full relative  px-4 sm:px-6 lg:px-44 mb-10 overflow-hidden ">
  <div className="relative z-10 ">
    <h1 className="font-poppins text-[12px] sm:text-[14px] md:text-[16px] text-[#5b3423] uppercase tracking-widest mb-8">
      Accommodation
    </h1>
    <p className="max-w-[800px] font-nanum text-[28px] sm:text-[36px] md:text-[44px] lg:text-[66px] text-[#5b3423]">
      {accommodationData.heading}
    </p>
  </div>
</div>
      <RoomsCarousel />
    </div>
  );
};

export default Accommodation;
