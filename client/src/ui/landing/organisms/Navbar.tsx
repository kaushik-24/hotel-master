import Logo from "@ui/common/molecules/Logo";
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Menu from "./sidebar/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to handle menu toggle
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu and re-enable scrolling when a link is clicked
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {

        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''; // Reset to default
        }

        // Clean up on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <nav className="absolute top-0 left-0 w-full h-[90px] px-14 flex justify-between items-center z-50 bg-gradient-to-b from-black/50 to-transparent">
            <Logo />
            <div className="flex items-center gap-x-8">
            <Link to={"/booking"}>
                <button
                    className="hidden md:flex border-2 border-[#ffeedc] text-[#ffeedc] rounded-sm py-2 px-4 hover:bg-[#ffeedc] hover:text-black cursor-pointer">
                    Book Now.
                </button>
            </Link>
                <button onClick={toggleMenu} className="text-[#ffeedc] cursor-pointer">
                    {isMenuOpen ? null : <AiOutlineMenu size={18} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 flex flex-col items-center bg-split-gradient z-10 overflow-y-auto">
                    <Menu onClose={closeMenu} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
