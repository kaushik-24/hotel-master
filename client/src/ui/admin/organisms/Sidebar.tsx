import { adminSidebar } from "@data/adminSidebar";
import { adminSidebarIcon } from "@ui/admin/atoms/SidebarIcon";
import ConfirmationBox from "@ui/common/molecules/ConfirmationBox";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [activeItem, setActiveItem] = useState<number | null>(null);

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    const handleLogout = () => {
        localStorage.removeItem("HotelVenusLastLogin");
        localStorage.removeItem("HotelVenusName");
        navigate("/");
    };

    const toggleSubItems = (id: number) => {
        setActiveItem(prev => (prev === id ? null : id));
    };

    return (
        <>
            <aside className="w-48 fixed md:relative transition-all bg-white px-3 pb-8 pt-3 md:ml-6 border border-[#e4e4f4] shadow-md h-screen z-10">
                <ul>
                    {adminSidebar.map(item => (
                        <li key={item.id} className="mb-4">
                            <div
                                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:text-[#019cec]"
                                onClick={() =>
                                    item.subItems ? toggleSubItems(item.id) : setActiveItem(null)
                                }
                            >
                                <div className="flex items-center gap-x-2">
                                    <span className="h-4 w-4">{adminSidebarIcon[item.label]}</span>
                                    <Link to={item.route}>{item.label}</Link>
                                </div>

                                {item.subItems && (
                                    <IoChevronDownSharp
                                        className={`transition-transform duration-200 ${
                                            activeItem === item.id ? "rotate-180" : ""
                                        }`}
                                        size={16}
                                    />
                                )}
                            </div>

                            {item.subItems && activeItem === item.id && (
                                <ul className="ml-8 mt-2 text-sm text-[#56595a]">
                                    {item.subItems.map(subItem => (
                                        <li key={subItem.id} className="mb-2 flex">
                                            <Link
                                                to={subItem.route}
                                                className="flex items-center hover:text-[#019cec]"
                                            >
                                                {subItem.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}

                    <li
                        onClick={openModal}
                        className="flex items-center gap-x-2 mb-4 px-4 py-2 hover:text-[#019cec] cursor-pointer"
                    >
                        <IoLogOutOutline size={22} />
                        Logout
                    </li>
                </ul>
            </aside>

            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <ConfirmationBox onClose={closeModal} message="Logout" onConfirm={handleLogout} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;

