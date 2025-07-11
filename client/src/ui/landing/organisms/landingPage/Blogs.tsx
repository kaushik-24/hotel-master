import React, { useEffect, useState } from "react";
import axiosInstance from "@services/instance";
import { Link } from "react-router-dom";

interface IBlog {
  _id: string;
  title: string;
  author: string;
  image: string;
  content: string;
  createdAt: string;
}

const shuffleBlog = (array: IBlog[]): IBlog[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/api/blogPost");
        setBlogs(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const randomBlogs = shuffleBlog([...blogs]).slice(0, 3);

   // Truncate content to ~80 characters for the excerpt
    const getExcerpt = (text: string, maxLength: number = 80) => {
      // Remove HTML tags if content is HTML
      const plainText = text.replace(/<[^>]+>/g, '');
      if (plainText.length <= maxLength) return plainText;
      return plainText.substring(0, maxLength).trim() + '...';
    };

  return (
    <div className="bg-[#ffeedc] py-12 flex flex-col justify-center items-center min-h-[600px]">
      <h1 className="text-4xl md:text-5xl font-nanum text-[#4a2c1e] font-bold mb-8 tracking-tight">
        Latest Blogs
      </h1>
      {error && (
        <p className="text-red-600 font-poppins text-lg mb-6">{error}</p>
      )}
      {loading ? (
        <p className="text-[#4a2c1e] font-poppins text-lg animate-pulse">
          Loading blogs...
        </p>
      ) : randomBlogs.length === 0 ? (
        <p className="text-[#4a2c1e] font-poppins text-lg">
          No blogs available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 max-w-7xl">
          {randomBlogs.map((blog) => (
            <div
              key={blog._id}
              className="group rounded-lg shadow-lg overflow-hidden flex flex-col h-[450px] transition-transform duration-300  hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_APP_BASE_URL}${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <p className="text-xs font-nanum text-gray-500 mb-2">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-xl font-nanum font-semibold text-[#4a2c1e] mb-3 tracking-wide line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm font-poppins text-gray-700 flex-grow line-clamp-3">
                  {getExcerpt(blog.content)}
                </p>
                <Link to={`/blogs/${blog.title}`} className="mt-4">
                  <button className="uppercase font-poppins text-xs font-medium text-[#4a2c1e] border-2 border-[#4a2c1e] px-4 py-2 rounded-md hover:bg-[#4a2c1e] hover:text-white transition-colors duration-300">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/blogs" className="mt-10">
        <button className="uppercase font-poppins text-sm font-medium text-white bg-[#4a2c1e] px-6 py-3 rounded-md hover:bg-[#5b3423] transition-colors duration-300">
          View All Blogs
        </button>
      </Link>
    </div>
  );
};

export default Blogs;
