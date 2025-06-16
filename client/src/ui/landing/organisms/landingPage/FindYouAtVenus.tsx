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

  if (loading) {
    return <div className="text-center py-20 text-[#5B3423]">Loading...</div>;
  }

  if (error || !aboutUsData) {
    return <div className="text-center py-20 text-[#5B3423]">{error || "No data available"}</div>;
  }

  // Split description1 if it exceeds 30 words
  const description1Paragraphs = splitIntoParagraphs(aboutUsData.description1, 30);

  return (
    <div className="bg-[#ffeedc] py-20 flex justify-center items-center flex-col animate-fadeInUp">
      <p className="uppercase font-poppins text-[14px] mb-5 text-[#5B3423] tracking-widest animate-fadeInUp">
        {aboutUsData.subtitle}
      </p>
      <h1 className="font-nanum text-[#5B3423] text-[54px] animate-fadeInUp">
        {aboutUsData.heading}
      </h1>
      <p className="font-nanum text-[#5B3423] text-[28px] mt-10 animate-fadeInUp">
        {aboutUsData.subheading}
      </p>

      <div className="mt-9 max-w-[600px] text-center">
        {description1Paragraphs.map((paragraph, index) => (
          <p key={`desc1-${index}`} className="font-poppins text-[17px] mb-5 animate-fadeInUp">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex gap-x-6 animate-fadeInUp">
        <Link to="/about-us">
          <button className="uppercase font-poppins text-[12px] text-[#4F2F1F] border-2 border-[#4f2f1f] px-3 py-2 hover:bg-[#4f2f1f] hover:text-[#fffcf1]">
            explore more
          </button>
        </Link>
        <Link to="/booking">
          <button className="uppercase font-poppins text-[12px] text-[#4F2F1F] border-2 border-[#4f2f1f] px-3 py-2 hover:bg-[#4f2f1f] hover:text-[#fffcf1]">
            book now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FindYouAtVenus;
