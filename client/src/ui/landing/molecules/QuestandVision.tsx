import React, { useState, useEffect } from "react";
import axiosInstance from "@services/instance";
import { image } from "@config/constant/image";

interface Section {
  topic: string;
  description: string;
}

interface QuestAndVisionData {
  title: string;
  mainDescription: string;
  sections: Section[];
}

const QuestandVision: React.FC = () => {
  const [data, setData] = useState<QuestAndVisionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/questValues");
        console.log("Fetched Quest and Values data:", response.data);
        setData(response.data.data.questAndVision);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch Quest & Vision data");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center p-4 sm:p-6 text-[14px] sm:text-[16px]">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-center p-4 sm:p-6 text-[14px] sm:text-[16px]">Loading...</div>;
  }

  return (
    <div className="mb-8 sm:mb-10 md:mb-20 px-4 sm:px-6 md:px-8">
      <div className="leading-[1.1] mb-6 sm:mb-8 md:mb-10">
        <h1 className="font-nanum text-[32px] sm:text-[40px] md:text-[66px] text-[#5b3423]">{data.title}</h1>
        <p className="uppercase font-poppins text-[#5b3423] text-[12px] sm:text-[14px] mt-2">
          {data.mainDescription}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        {data.sections.map((item, index) => (
          <div key={index} className="flex flex-col">
            <h2 className="text-[18px] sm:text-[20px] md:text-[24px] font-nanum text-[#5B3423] mb-3 sm:mb-4">
              {item.topic}
            </h2>
            <p className="text-[14px] sm:text-[16px] font-poppins text-[#4F2F1F] max-w-[400px] sm:max-w-[450px]">
              {item.description}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestandVision;
