import React, { useState, useEffect } from "react";
import axiosInstance from "@services/instance";
import { image } from "@config/constant/image";

interface HistorySection {
  heading: string;
  description: string;
  image?: string;
}

interface HistoryData {
  title: string;
  mainDescription: string;
  sections: HistorySection[];
}

const OurHistory: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axiosInstance.get("/api/history");
        console.log("Fetched history data:", response.data); // Debug log
        setHistoryData(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch history data");
      }
    };
    fetchHistoryData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center p-6">Error: {error}</div>;
  }

  if (!historyData) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="bg-[#f6e6d6] py-8 sm:py-10">
      <div className="px-4 sm:px-6 md:px-20 pb-10 md:pb-20">
        <h1 className="uppercase font-poppins text-[12px] sm:text-[14px] text-[#5b3423]">{historyData.title}</h1>
        <p className="font-nanum text-[32px] sm:text-[40px] md:text-[60px] text-[#5b3423] w-full md:max-w-[900px] leading-[1.1]">
          {historyData.mainDescription}
        </p>
      </div>

      {historyData.sections.length === 1 ? (
        // Single-section layout
        <div className="px-4 sm:px-6 md:px-20 pb-10 md:pb-20 flex flex-col items-center gap-y-4 sm:gap-y-5">
          {historyData.sections[0].heading && (
            <h2 className="font-nanum text-[20px] sm:text-[24px] text-[#5b3423] mb-4 text-center">
              {historyData.sections[0].heading}
            </h2>
          )}
          <img
            src={historyData.sections[0]?.image ? `${import.meta.env.VITE_APP_BASE_URL}${historyData.sections[0].image}` : image.historyOne}
            alt="History One"
            className="w-full max-w-sm sm:max-w-md h-auto object-cover rounded-md"
          />
          <div className="flex flex-col gap-y-4 sm:gap-y-5 text-center">
            {historyData.sections[0]?.description ? (
              historyData.sections[0].description.split("\n").map((paragraph, index) => (
                <p key={index} className="text-[14px] sm:text-[16px] font-poppins max-w-[600px] mx-auto">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-[14px] sm:text-[16px] font-poppins max-w-[600px] mx-auto text-gray-500">
                No description available
              </p>
            )}
          </div>
        </div>
      ) : (
        // Two-section layout
        <div className="flex flex-col md:flex-row justify-between px-4 sm:px-6 md:px-20 gap-y-6 sm:gap-y-8 md:gap-x-5">
          <div className="flex-1 flex flex-col gap-y-4 sm:gap-y-5">
            {historyData.sections[0].heading && (
              <h2 className="font-nanum text-[20px] sm:text-[24px] md:text-[28px] text-[#5b3423] mb-4">
                {historyData.sections[0].heading}
              </h2>
            )}
            <img
              src={historyData.sections[0]?.image ? `${import.meta.env.VITE_APP_BASE_URL}${historyData.sections[0].image}` : image.historyOne}
              alt="History One"
              className="w-full max-w-sm sm:max-w-md h-auto object-cover rounded-md"
            />
            <div className="flex flex-col gap-y-4 sm:gap-y-5">
              {historyData.sections[0]?.description ? (
                historyData.sections[0].description.split("\n").map((paragraph, index) => (
                  <p key={index} className="text-[14px] sm:text-[16px] font-poppins w-full sm:max-w-[445px]">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-[14px] sm:text-[16px] font-poppins w-full sm:max-w-[445px] text-gray-500">
                  No description available
                </p>
              )}
            </div>
          </div>
          {historyData.sections[1] && (
            <div className="flex-1 flex flex-col gap-y-4 sm:gap-y-5">
              {historyData.sections[1].heading && (
                <h2 className="font-nanum text-[20px] sm:text-[24px] md:text-[28px] text-[#5b3423] mb-4">
                  {historyData.sections[1].heading}
                </h2>
              )}
              <div className="flex flex-col gap-y-4 sm:gap-y-5">
                {historyData.sections[1].description ? (
                  historyData.sections[1].description.split("\n").map((paragraph, index) => (
                    <p key={index} className="text-[14px] sm:text-[16px] font-poppins">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-[14px] sm:text-[16px] font-poppins text-gray-500">No description available</p>
                )}
              </div>
              <img
                src={historyData.sections[1]?.image ? `${import.meta.env.VITE_APP_BASE_URL}${historyData.sections[1].image}` : image.historyTwo}
                alt="History Two"
                className="w-full max-w-sm sm:max-w-md h-auto object-cover rounded-md"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OurHistory;
