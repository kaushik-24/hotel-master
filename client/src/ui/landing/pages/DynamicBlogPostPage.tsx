import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageNotFound from "@ui/common/pages/PageNotFound";
import axiosInstance from "@services/instance";
import RoomHeading from "../atoms/RoomHeading";
import RoomSlogan from "../atoms/RoomSlogan";
import { FaArrowLeft } from "react-icons/fa";

interface BlogPostData {
  title: string;
  author: string;
  createdAt: string;
  image: string;
  content: string;
}

const DynamicBlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blogPost, setblogPost] = useState<BlogPostData | null>(null);
  const [notFound, setNotFound] = useState(false);

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


  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axiosInstance.get(`/api/blogPost/slug/${slug}`);
        setblogPost(response.data.data);
      } catch (err) {
        setNotFound(true);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (notFound) return <PageNotFound />;
  if (!blogPost) return <div className="p-4">Loading blog...</div>;

  
  // Split description1 if it exceeds 30 words
  const contentParagraphs = splitIntoParagraphs(blogPost.content, 120);


  return (
         <div className="flex flex-col bg-[#f6e6d6] text-[#5b3423] justify-center ">
          {/* Main Blog Content */}
       <main className="bg-secondary py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4">{blogPost.title}</h1>
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-600">By {blogPost.author}</span>
            <span className="text-sm text-gray-600">
              {new Date(blogPost.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-5">
            <button
              onClick={() => navigate("/blogs")}
              className="flex items-center text-gray-600 hover:text-[#5b3423]"
            >
              <FaArrowLeft className="mr-1" /> Back to Blogs
            </button>
            
          </div>
          <div className="mb-8">
            {blogPost.image ? (
              <img
                src={`${import.meta.env.VITE_APP_BASE_URL}${blogPost.image}`}
                alt={blogPost.title}
                className="h-64 w-full object-cover rounded-lg"
              />
            ) : (
              <div className="bg-gray-300 h-64 w-full rounded-lg flex items-center justify-center text-gray-600">
                [Image Placeholder]
              </div>
            )}
          </div>
          <div className="mt-9  text-start">
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

export default DynamicBlogPage;


