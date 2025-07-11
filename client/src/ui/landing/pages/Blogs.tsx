import RoomDescription from "../atoms/RoomDescription";
import RoomHeading from "../atoms/RoomHeading";
import RoomSlogan from "../atoms/RoomSlogan";
import { useEffect, useState } from 'react';
import axiosInstance from '@services/instance';
import { useNavigate } from 'react-router-dom';

interface BlogPostData {
  title: string;
  author: string;
  createdAt: string;
  image: string;
  content: string;
}

const Blogs = () => {
    const navigate = useNavigate();
    const [blogPost, setblogPost] = useState<BlogPostData[] | null>(null);
    const [notFound, setNotFound] = useState(false);
    
    // Function to create a URL-friendly slug
    const slugify = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    };
    
    // Truncate content to ~80 characters for the excerpt
    const getExcerpt = (text: string, maxLength: number = 80) => {
      // Remove HTML tags if content is HTML
      const plainText = text.replace(/<[^>]+>/g, '');
      if (plainText.length <= maxLength) return plainText;
      return plainText.substring(0, maxLength).trim() + '...';
    };

    useEffect(() => {
      const fetchBlogPost = async () => {
        try {
          const response = await axiosInstance.get(`/api/blogPost`);
          setblogPost(response.data.data);
        } catch (err) {
          setNotFound(true);
        }
      };

      fetchBlogPost();
    }, []);

    return (
        <div className="bg-[#f6e6d6] py-12 flex flex-col justify-center items-center min-h-[600px]">
            <div className="text-center mb-8">
                <RoomHeading headingText="Blogs" />
                <RoomSlogan slogan="Our Reads" />
                <RoomDescription description="Hear more stories about us, from us." />
            </div>

            {notFound ? (
                <p className="text-[#ffd6c6] font-poppins text-lg">
                    No blogs available at the moment.
                </p>
            ) : !blogPost ? (
                <p className="text-[#ffd6c6] font-poppins text-lg animate-pulse">
                    Loading blogs...
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 max-w-7xl">
                    {blogPost.map((blogs, index) => (
                        <div
                            key={index}
                            className="group  rounded-lg shadow-lg overflow-hidden flex flex-col h-[450px] transition-transform duration-300 hover:shadow-xl "
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={`${import.meta.env.VITE_APP_BASE_URL}${blogs.image}`}
                                    alt={blogs.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col flex-grow p-6">
                                <p className="text-xs font-nanum text-gray-700 mb-2">
                                    {new Date(blogs.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <h1 className="text-xl font-nanum font-semibold text-[#4a2c1e] mb-3 tracking-wide line-clamp-2">
                                    {blogs.title}
                                </h1>
                                <p className="text-sm font-poppins text-gray-700 flex-grow line-clamp-3">
                                    {getExcerpt(blogs.content)}
                                </p>
                                <button
                                    onClick={() => navigate(`/blogs/${slugify(blogs.title)}`)}
                                    className="mt-4 uppercase font-poppins text-xs font-medium text-[#4a2c1e] border-2 border-[#4a2c1e] px-4 py-2 rounded-md hover:bg-[#5b3423] hover:text-white transition-colors duration-300"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blogs;
