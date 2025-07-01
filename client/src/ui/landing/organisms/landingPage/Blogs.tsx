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

  return (
    <div className="bg-[#f6e6d6] py-6 flex flex-col justify-center items-center">
      <h1 className="text-[40px] font-nanum text-[#5b3423] mb-4">Blogs</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p className="text-[#5b3423]">Loading blogs...</p>
      ) : randomBlogs.length === 0 ? (
        <p className="text-[#5b3423]">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 px-10">
          {randomBlogs.map((blog) => (
            <div className="group bg-[#ffeedc] flex flex-col" key={blog._id}>
              <div className="flex justify-center items-center overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_APP_BASE_URL}${blog.image}`}
                  alt={blog.title}
                  className="group-hover:opacity-90 object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-110 w-full h-[150px]"
                />
              </div>
              <div className="flex flex-col justify-start gap-y-2 px-4 py-4 max-w-[300px]">
                <p className="text-xs font-nanum text-[#a3a3a3]">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <h2 className="group-hover:cursor-pointer text-[15px] font-semibold font-nanum text-[#5b3423] py-1 tracking-wider">
                  {blog.title}
                </h2>
                <p className="text-sm font-poppins text-black mb-3">
                  {blog.content.substring(0, 80)}...
                </p>
                <Link to={`/blogs/${blog.title}`}>
                  <button
                    className="uppercase font-poppins tracking-widest border-2 border-[#5b3423] text-[11px] text-[#5b3423] px-2 py-1 hover:bg-[#5b3423] hover:text-[#ffeedc] max-w-[100px]"
                  >
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/blogs">
        <button
          className="uppercase font-poppins tracking-widest text-[11px] text-[#ffeedc] px-2 py-2 bg-[#5b3423] hover:bg-[#713f25] mt-6"
        >
          View All
        </button>
      </Link>
    </div>
  );
};

export default Blogs;
