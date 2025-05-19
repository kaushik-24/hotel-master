import { CiMail } from "react-icons/ci";
import { FaFile, FaFileAlt, FaUser } from "react-icons/fa"; // Import icons from react-icons
import { FaUserPlus } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { IoEarth, IoSettings } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineBedroomParent } from "react-icons/md";



export const adminSidebarIcon: { [key: string]: JSX.Element } = {
    "Dashboard": <LuLayoutDashboard />,
    "Site Options": <IoMdHome />,
    "Posts": <FaFileAlt />,
    "Pages": <FaFile />,
    "Manage User": <FaUser />,
    "Rooms": <MdOutlineBedroomParent />,
    "Manage Booking": <MdOutlineBedroomParent />,
    "Services": <IoEarth />,
    "Inquiry": <CiMail />,
    "User Profile": <FaUserPlus />,
    "Settings": <IoSettings />
};