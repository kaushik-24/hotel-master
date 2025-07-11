import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface AboutUsData {
  subtitle: string;
  heading: string;
  subheading: string;
  description1: string;
}

const FindYouAtVenus = () => {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to split text into paragraphs after a period, based on word count
  const splitIntoParagraphs = (text: string, maxWords: number = 30): string[] => {
    const sentences = text.split(/(?<=\.)\s+/); // Split after periods, preserving them
    let currentParagraph = "";
    let wordCount = 0;
    const paragraphs: string[] = [];

    for (const sentence of sentences) {
      const sentenceWordCount = sentence.split(/\s+/).filter((word) => word.length > 0).length;

      if (wordCount + sentenceWordCount <= maxWords) {
        currentParagraph += (currentParagraph ? " " : "") + sentence;
        wordCount += sentenceWordCount;
      } else {
        if (currentParagraph) {
          paragraphs.push(currentParagraph.trim());
        }
        currentParagraph = sentence;
        wordCount = sentenceWordCount;
      }
    }

    if (currentParagraph) {
      paragraphs.push(currentParagraph.trim());
    }

    return paragraphs;
  };

  // Fetch About Us data
  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/homeAboutUs");
        setAboutUsData(response.data.data); // Assuming backend response structure: { success: true, message: string, data: AboutUsData }
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch About Us data");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  

  if (error || !aboutUsData) {
    return <div className="text-center py-20 text-[#5B3423]">{error || "No data available"}</div>;
  }

  // Split description1 if it exceeds 30 words
  const description1Paragraphs = splitIntoParagraphs(aboutUsData.description1, 30);

  return (
      <div className="relative bg-[#ffeedc] py-20 flex justify-center items-center flex-col overflow-hidden bg-[url('data:image/svg+xml,%3Csvg width=&quot;20&quot; height=&quot;20&quot; viewBox=&quot;0 0 20 20&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cpath d=&quot;M10 0 L20 10 L10 20 L0 10 Z&quot; fill=&quot;%23fffcf1&quot; fill-opacity=&quot;0.1&quot;/%3E%3C/svg%3E')] bg-repeat">
  {/* Decorative Divider */}
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4f2f1f]/30 to-transparent"></div>

  <p className="relative uppercase font-poppins text-[14px] mb-5 text-[#5B3423] tracking-widest before:content-[''] before:absolute before:-left-16 before:top-1/2 before:h-px before:w-12 before:bg-[#5B3423]/50 after:content-[''] after:absolute after:-right-16 after:top-1/2 after:h-px after:w-12 after:bg-[#5B3423]/50">
    {aboutUsData.subtitle}
  </p>
  <h1 className="relative font-nanum text-[#5B3423] text-[54px] animate-fadeInUp drop-shadow-md">
    {aboutUsData.heading}
  </h1>
  <p className="relative font-nanum text-[#5B3423] text-[28px] mt-10 animate-fadeInUp italic">
    {aboutUsData.subheading}
  </p>

  <div className="relative mt-9 max-w-[600px] text-center  p-6  ">
    {description1Paragraphs.map((paragraph, index) => (
      <p key={`desc1-${index}`} className="font-poppins text-[17px] mb-5 animate-fadeInUp text-[#4F2F1F]">
        {paragraph}
      </p>
    ))}
  </div>

  <div className="relative flex gap-x-6 animate-fadeInUp mt-8">
    <Link to="/about-us">
      <button className="uppercase font-poppins text-[12px] text-[#4F2F1F] border-2 border-[#4f2f1f] px-4 py-2 rounded-md hover:bg-[#4f2f1f] hover:text-[#fffcf1] transition-all duration-300 hover:shadow-md hover:scale-105">
        Explore More
      </button>
    </Link>
    <Link to="/booking">
      <button className="uppercase font-poppins text-[12px] text-[#fffcf1] bg-[#4f2f1f] border-2 border-[#4f2f1f] px-4 py-2 rounded-md hover:bg-[#fffcf1] hover:text-[#4F2F1F] transition-all duration-300 hover:shadow-md hover:scale-105">
        Book Now
      </button>
    </Link>
  </div>

  {/* Bottom Decorative Divider */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4f2f1f]/30 to-transparent"></div>
</div>
      );
};

export default FindYouAtVenus;
