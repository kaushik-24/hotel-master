import { adminImage } from "@config/constant/adminImage";
import { timeAgo } from "@utils/timeAgo";
import { useState } from "react";
import { IoEarth } from "react-icons/io5";
import { LuPaintbrush } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const [today] = useState(
        `Today : ${new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        }).format(new Date())}`
    );
    const adminName = localStorage.getItem('HotelVenusName');
    const lastLogin = localStorage.getItem('HotelVenusLastLogin');

    const capitalizeWords = (str: string) => {
        return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
    };

    return (
        <nav className="bg-[#019cec] w-full py-1 flex h-20 gap-x-5 pl-5">
            <div className=" flex justify-center items-center gap-x-5 ">
                <div className="flex md:hidden">
                    <p className="font-poppins text-white font-medium text-2xl">A</p>
                </div>
                <div className="hidden md:flex gap-x-2 items-center">
                    <p className="font-poppins text-white font-medium text-2xl">Admin Panel</p>
                    <TiThMenu onClick={toggleSidebar} className="cursor-pointer" color="white" size={25} />
                </div>
            </div>

            <div className=" bg-[#ffffff] px-8 flex-1 flex  items-center w-full">
                <div className="hidden md:flex  items-center gap-x-2 w-full ">
                    <img src={adminImage?.adminProfile} alt="Admin Profile" className="h-8" />
                    <p className="font-poppins text-[0.5rem] md:text-[1rem]">Welcome, {adminName && capitalizeWords(adminName)}</p>
                    <p className=" font-poppins text-xs">Last login: {timeAgo(lastLogin)}</p>
                </div>
                <div className="flex justify-end items-center w-full gap-x-3">

                    <button className="bg-[#ffffff] p-2 border-2 border-[#e4e4f4] shadow-xl rounded-md">
                        <IoEarth className="text-gray-500" />
                    </button>
                    <button className="bg-[#ffffff] p-2 border-2 border-[#e4e4f4] shadow-xl rounded-md">
                        <LuPaintbrush className="text-gray-500" />
                    </button>
                    <div className="hidden md:block bg-[#ffffff] p-2 border-2 border-[#e4e4f4] shadow-xl rounded-md">
                        <p className="text-gray-500 flex items-center gap-x-2 font-poppins text-[0.875rem]">
                            {today}
                            <MdDateRange size={20} />
                        </p>
                    </div>

                    <div className="flex md:hidden">
                        <TiThMenu onClick={toggleSidebar} className="cursor-pointer text-black" size={25} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
