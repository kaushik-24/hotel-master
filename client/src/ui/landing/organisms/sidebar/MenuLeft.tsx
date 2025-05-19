import Logo from "@ui/common/molecules/Logo";
import Social from "@ui/common/molecules/Social";

interface MenuProps {
    onClose: () => void;
}

const MenuLeft: React.FC<MenuProps> = ({ onClose }) => {
    return (
        <div className="flex flex-col gap-y-20">
            <Logo onClose={onClose} />
            <div className="flex flex-col justify-around items-center gap-y-5">

                <div className="flex flex-col justify-center items-center gap-y-5">
                    <h1 className="font-nanum text-[28px]">Hotel Venus</h1>
                    <p className="font-poppins text-[15px]">PO Box 5831, Khadbari<br />Sankhuwasabha, Nepal</p>
                    <p></p>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <p>+977 1 4650541</p>
                    <p>For general enquiries :<br />info@venushotel.com</p>
                </div>

                <button
                    className="hidden md:flex border-2 border-[#ffeedc]  rounded-sm py-2 px-4 hover:bg-[#ffeedc] cursor-pointer mt-2">
                    Book Now
                </button>

            </div>

            <Social />
        </div>
    )
}

export default MenuLeft
