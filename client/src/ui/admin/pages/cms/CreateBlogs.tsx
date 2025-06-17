import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    author: string;
    createdAt: string;
    content: string;
}

const AllBlogPosts = () => {
    const [blogPost, setblogPost] = useState<BlogPost[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch rooms from the backend
        const fetchBlogPosts = async () => {
            try {
                const response = await axiosInstance.get("/api/blogPost");
                const roomData = response.data?.data; // Access the nested `data` field
                if (Array.isArray(roomData)) {
                    setblogPost(roomData); // Set rooms from the `data` array
                } else {
                    console.error("Unexpected data format:", response.data);
                    setblogPost([]); // Fallback in case the response is not an array
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchBlogPosts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/api/blogPost/${id}`);
            setblogPost(blogPost.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error("Error deleting blogPost:", error);
        }
    };

    return (
        <>
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium">Blog Posts</h2>
                <Link to="/admin/cms/blogs/create">
                <button
                    className="px-6 py-2 bg-[#019cec] rounded-md text-white font-poppins hover:bg-[#017a9b] transition-colors"
            >Create Blogs
            </button></Link>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Author</th>
                        <th className="border px-4 py-2">Created Date</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogPost.length > 0 ? (
                        blogPost.map((blog) => (
                            <tr key={blog._id}>
                                <td className="border px-4 py-2">{blog.title}</td>
                                <td className="border px-4 py-2">{blog.author}</td>
                                <td className="border px-4 py-2">{blog.createdAt}</td>
                                <td className="border px-4 py-2 flex space-x-4">
                                    <Link to={`/admin/cms/blogs/edit/${blog._id}`} className="btn-edit text-blue-600 hover:text-blue-800">
                                      <FaEdit />
                                    </Link>
                                    <button onClick={() => handleDelete(blog._id)} className="btn-delete text-red-600 hover:text-red-800">
                                      <FaTrash />
                                    </button>
                                    <Link to={`/blogs/${blog.slug}`} 
                                    className="text-blue-600 hover:text-blue-800"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    > <FaExternalLinkAlt /></Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4">No rooms found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
          
          <div className="flex items-center gap-4 mt-5">
            <button
              onClick={() => navigate("/admin/cms/home/accommodation")}
              className="flex items-center text-gray-600 hover:text-[#019cec]"
            >
              <FaExternalLinkAlt className="mr-1" /> Accommadation</button>
          </div>
          </div>

        </>
    );
};

export default AllBlogPosts;

