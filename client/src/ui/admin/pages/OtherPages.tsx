import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Page {
    _id: string;
    name: string;
    slug: string;
}

const OtherPages = () => {
    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        // Fetch pages from the backend
        const fetchPages = async () => {
            try {
                const response = await axiosInstance.get("/page");
                const pageData = response.data?.data; // Access the nested `data` field
                if (Array.isArray(pageData)) {
                    setPages(pageData); // Set pages from the `data` array
                } else {
                    console.error("Unexpected data format:", response.data);
                    setPages([]); // Fallback in case the response is not an array
                }
            } catch (error) {
                console.error("Error fetching pages:", error);
            }
        };

        fetchPages();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/page/${id}`);
            setPages(pages.filter((page) => page._id !== id));
        } catch (error) {
            console.error("Error deleting page:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium">All Pages</h2>
                <Link to="/admin/pages/create" className="btn-primary">Create Page</Link>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Slug</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.length > 0 ? (
                        pages.map((page) => (
                            <tr key={page._id}>
                                <td className="border px-4 py-2">{page.name}</td>
                                <td className="border px-4 py-2">{page.slug}</td>
                                <td className="border px-4 py-2 flex space-x-4">
                                    <Link to={`/admin/pages/edit/${page._id}`} className="btn-edit">Edit</Link>
                                    <button onClick={() => handleDelete(page._id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4">No pages found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OtherPages;
