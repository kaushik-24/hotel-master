import { adminSidebar } from "@data/adminSidebar";
import { adminSidebarIcon } from "@ui/admin/atoms/SidebarIcon";
import ConfirmationBox from "@ui/common/molecules/ConfirmationBox";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<number | null>(null); // Track active item for expanding sublists

    const openModal = () => {
        setModal(true);
    };
    const closeModal = () => {
        setModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('HotelVenusLastLogin');
        localStorage.removeItem('HotelVenusName');
        navigate('/');
    };

    // Toggle the active menu item to show sub-items
    const toggleSubItems = (id: number) => {
        setActiveItem(activeItem === id ? null : id);
    };

    return (
        <>
            <aside
                className={`${isOpen ? 'translate-x-0 ' : '-translate-x-full'} fixed w-fit md:relative md:translate-x-0 transition-transform duration-300 bg-[#ffffff] left-0 px-3 pb-8 pt-3 md:ml-6 border-[1px] border-[#e4e4f4] shadow-md h-screen z-10`}
            >
                <ul>
                    {adminSidebar.map((item) => (
                        <li
                            key={item.id}
                            className={`mb-4 relative group`}  // 'group' used to apply hover effects when minimized
                        >
                            <div
                                title={item.title}
                                className="hover:bg-[#f7f8fc] flex items-center gap-x-2 px-4 py-2 cursor-pointer"
                                onClick={() => item.subItems ? toggleSubItems(item.id) : null}
                            >
                                <Link to={item.route} className="flex items-center w-full">
                                    <p className="mr-2 text-[#56595a] h-4 w-4">
                                        {adminSidebarIcon[item.label]}
                                    </p>
                                    {isOpen && (
                                        <span className="text-[#56595a]">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </div>

                            {/* Sublist handling */}
                            {item.subItems && (
                                <>
                                    {/* Show sublist below the parent when sidebar is open */}
                                    {isOpen && activeItem === item.id && (

                                        <ul className="ml-6 mt-2 text-sm text-[#56595a]"> {/* Smaller text for sublist */}
                                            {/* <p>{item.label}</p> */}
                                            {item.subItems.map(subItem => (
                                                <li key={subItem.id} className="mb-2">
                                                    <Link to={subItem.route} className="flex items-center">
                                                        <span className="text-[#56595a]">
                                                            {subItem.label}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Show sublist on hover when sidebar is minimized */}
                                    {!isOpen && (
                                        <ul className="absolute left-full top-0 ml-2 bg-white shadow-lg border border-gray-200 text-sm text-[#56595a] group-hover:block hidden z-10"> {/* Sublist on hover */}
                                            {item.subItems.map(subItem => (
                                                <li key={subItem.id} className="mb-2 px-4 py-2">
                                                    <Link to={subItem.route}>
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                    <li
                        onClick={openModal}
                        className="flex gap-x-2 mb-4 hover:bg-[#f7f8fc] px-4 py-2 text-[#56595a] hover:cursor-pointer"
                    >
                        <span>
                            <IoLogOutOutline size={22} />
                        </span>
                        {isOpen && 'Logout'}
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
