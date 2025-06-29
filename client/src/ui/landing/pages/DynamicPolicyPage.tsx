import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageNotFound from "@ui/common/pages/PageNotFound";
import axiosInstance from "@services/instance";
import { FaArrowLeft } from "react-icons/fa";

interface PolicyData {
  title: string;
  author: string;
  createdAt: string;
  image: string;
  content: string;
}

const DynamicPolicyPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState<PolicyData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const splitIntoParagraphs = (text: string, maxWords: number = 30): string[] => {
    const sentences = text.split(/(?<=\.)\s+/);
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

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axiosInstance.get(`/api/policy/slug/${slug}`);
        setPolicy(response.data.data);
      } catch (err) {
        setNotFound(true);
      }
    };

    fetchPolicy();
  }, [slug]);

  if (notFound) return <PageNotFound />;
  if (!policy) return <div className="p-4">Loading policy...</div>;

  const contentParagraphs = splitIntoParagraphs(policy.content, 120);

  return (
    <div className="flex flex-col bg-[#f6e6d6] text-[#5b3423] justify-center">
      <main className="bg-secondary py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4">{policy.title}</h1>
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-600">By {policy.author}</span>
            <span class="text-sm text-gray-600">
              {new Date(policy.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-5">
            <button
              onClick={() => navigate("/policy")}
              className="flex items-center text-gray-600 hover:text-[#5b3423]"
            >
              <FaArrowLeft className="mr-1" /> Back to Policies
            </button>
          </div>
          <div className="mb-8">
            {policy.image ? (
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}${policy.image}`}
                alt={policy.title}
                className="h-64 w-full object-cover rounded-lg"
              />
            ) : (
              <div className="bg-gray-300 h-64 w-full rounded-lg flex items-center justify-center text-gray-600">
                [Image Placeholder]
              </div>
            )}
          </div>
          <div className="mt-9 text-start">
            {contentParagraphs.map((paragraph, index) => (
              <p key={`desc1-${index}`} className="font-poppins text-[17px] mb-5 animate-fadeInUp">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DynamicPolicyPage;
