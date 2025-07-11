import Accomodation from "@ui/common/molecules/Accomodation";
import NavigationList from "@ui/common/molecules/NavigationList";

interface MenuProps {
    onClose: () => void;
}

const MenuRight: React.FC<MenuProps> = ({ onClose }) => {
    return (
        <div className="w-full flex flex-col justify-center gap-y-10 px-10">
            <div className="w-full flex flex-col md:flex-row gap-x-15">
                <Accomodation onClose={onClose} />
            </div>
            <hr className="w-[60%]" />
            <div className="flex items-start">
                <NavigationList onClose={onClose} />
            </div>
        </div>
    );
};

export default MenuRight;
