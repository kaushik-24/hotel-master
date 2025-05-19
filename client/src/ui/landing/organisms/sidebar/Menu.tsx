import { AiOutlineClose } from "react-icons/ai";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight";

interface MenuProps {
    onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClose }) => {
    return (
        <div className="w-full h-full bg-split-gradient-bottom md:bg-split-gradient relative z-50 overflow-y-auto">
            <button onClick={onClose} className="absolute top-4 right-4 z-50">
                <AiOutlineClose size={25} color="#ffeedc" />
            </button>

            <div className="text-[#ffeedc] h-full w-screen flex flex-col md:flex-row ">
                <div className="sm:bg-[#4f2f1f] md:w-[35%] h-full flex justify-center items-center px-10 py-5">
                    <MenuLeft onClose={onClose} />
                </div>
                <div className="sm:bg-[#5b3421] md:w-[65%] h-full flex justify-center items-center px-2 py-3">
                    <MenuRight onClose={onClose} />
                </div>
            </div>
        </div>
    );
};

export default Menu;
