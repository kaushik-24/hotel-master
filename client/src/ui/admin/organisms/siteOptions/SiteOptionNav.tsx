import { NavLink, useLocation } from "react-router-dom"; // Import NavLink for navigation

const SiteOptionNav = () => {
    const location = useLocation(); // Hook to get the current location

    return (
        <nav className="flex py-2 w-full">
            <ul className="flex justify-between w-full text-[#427bff] py-2">
                <li className={`p-2 ${location.search === "?tab=header" ? "bg-[#6b3aa3] text-white rounded-md" : ""}`}>
                    <NavLink
                        to="/admin/options?tab=header"
                        className={({ isActive }) => (isActive ? "p-2" : "p-2")}
                        end
                    >
                        Header
                    </NavLink>
                </li>
                <li className={`p-2 ${location.search === "?tab=footer" ? "bg-[#6b3aa3] text-white rounded-md" : ""}`}>
                    <NavLink
                        to="/admin/options?tab=footer"
                        className={({ isActive }) => (isActive ? "p-2" : "p-2")}
                        end
                    >
                        Footer
                    </NavLink>
                </li>
                <li className={`p-2 ${location.search === "?tab=info" ? "bg-[#6b3aa3] text-white rounded-md" : ""}`}>
                    <NavLink
                        to="/admin/options?tab=info"
                        className={({ isActive }) => (isActive ? "p-2" : "p-2")}
                        end
                    >
                        Info Section
                    </NavLink>
                </li>
                <li className={`p-2 ${location.search === "?tab=social" ? "bg-[#6b3aa3] text-white rounded-md" : ""}`}>
                    <NavLink
                        to="/admin/options?tab=social"
                        className={({ isActive }) => (isActive ? "p-2" : "p-2")}
                        end
                    >
                        Social Media
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default SiteOptionNav;
