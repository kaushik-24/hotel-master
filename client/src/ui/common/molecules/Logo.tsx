import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface LogoProps {
    textColor?: string
    onClose?: () => void;
}


interface HotelLogoData {
  path: string;
}


const Logo: React.FC<LogoProps> = () => {
  
  const [hotelLogoData, setHotelLogoData] = useState<HotelLogoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelLogoData = async () => {
      try {
        const response = await axiosInstance.get("/api/hotelLogo");
        setHotelLogoData(response.data.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch hero section data");
        setLoading(false);
      }
    };

    fetchHotelLogoData();
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
        /** logo temporary 
            <div className={`flex items-center gap-x-5 ${textColor}`}>
                <div className="">
                    <h1 className="font-nanum text-6xl itallic">V</h1>
                </div>
                <div className="font-poppins">
                    <p className="uppercase tracking-widest">hotel</p>
                    <p className="uppercase text-3xl tracking-widest">venus</p>
                    <hr />
                    <p className="tracking-widest">Khadbari</p>
                </div>
            </div>
        */
        <Link to={"/home"}>
        <img className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32" src={`${import.meta.env.VITE_APP_BASE_URL}${hotelLogoData?.path}`} />
        </Link>

    )
}

export default Logo
