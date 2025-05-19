import Logo from "@ui/common/molecules/Logo";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Menu from "./sidebar/Menu";

const RoomNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };
    return (
        <nav className="bg-[#f6e6d6]  px-14 flex justify-between items-center z-100">
            <Logo textColor="text-[#5b3423]" />
            <div className="flex items-center gap-x-8">
                <button
                    className="hidden md:flex border-2 border-[#5b3423] text-[#5b3423] rounded-sm py-2 px-4 hover:bg-[#ffeedc] hover:text-black cursor-pointer">
                    Book Now
                </button>

                <button onClick={toggleMenu} className="text-[#5b3423] cursor-pointer">
                    {isMenuOpen ? null : <AiOutlineMenu size={18} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 flex flex-col items-center bg-split-gradient z-10 overflow-y-auto">
                    <Menu onClose={toggleMenu} />
                </div>
            )}
        </nav>
    )
}

export default RoomNavbar
