import { blogs } from '@data/blog';
import { IBlog } from '@interface/blog.interface';
import RoomDescription from "../atoms/RoomDescription";
import RoomHeading from "../atoms/RoomHeading";
import RoomSlogan from "../atoms/RoomSlogan";
import { useEffect, useState } from 'react';
import axiosInstance from '@services/instance';
import { useNavigate } from 'react-router-dom';


interface BlogPostData {
  title: string;
  content: string;
}


const Blogs = () => {
    const navigate = useNavigate();
    const [policy, setblogPost] = useState<BlogPostData | null>(null);
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
        const response = await axiosInstance.get(`/api/policy`);
        setblogPost(response.data.data);
      } catch (err) {
        setNotFound(true);
      }
    };

    fetchBlogPost();
  }, []);



    return (
        <div className="bg-[#f6e6d6] flex flex-col justify-center ">
            <div>
                <RoomHeading headingText="Our Policies" />
                <RoomSlogan slogan="Our Reads" />
                <RoomDescription
                    description={"Learn more about our policies and guidelines that ensure a safe and fair experience."} />
            </div>

            <div className="bg-[#ffeedc] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 py-20 px-20">
                {policy?.map((blogs, index) => (
                    <div className='group bg-[#ffeedc] flex flex-col  ' key={index}>
                        <div className=" flex flex-col justify-start gap-y-4  px-5 py-5 max-w-[370px]">
                            <p className="text-xs font-nanum text-[#a3a3a3] ">
                              {new Date(blogs.createdAt).toLocaleDateString()}
                            </p>
                            <h1 className="group-hover:cursor-pointer text-[17px] font-semibold font-nanum  text-[#5b3423] py-2 tracking-wider ">{blogs?.title}</h1>
                            <p className="text-base font-poppins  text-black text-[14px] mb-5">{getExcerpt(`${blogs.content}`)}</p>

                            <button
                                onClick={() => navigate(`/policy/${slugify(blogs.title)}`)}
                                className="uppercase font-poppins tracking-widest border-2 border-[#5b3423] text-[12px] text-[#5b3423] px-2 py-1 
                            hover:bg-[#5b3423] hover:text-[#ffeedc] max-w-[123px] ">
                                Read More
                            </button>

                        </div>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default Blogs

