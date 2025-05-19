import { Link } from "react-router-dom";

interface MenuProps {
    onClose?: () => void;
}

const NavigationList: React.FC<MenuProps> = ({ onClose }) => {
    return (
        <div>
            <ul className="grid grid-cols-3 gap-x-5 gap-y-3 font-poppins text-[14px] ">
                <Link to='/home' onClick={onClose}><li className="hover:underline cursor-pointer uppercase">Home</li></Link>
                <Link to='/about-us' onClick={onClose}><li className="hover:underline cursor-pointer uppercase">About</li></Link>
                <Link to='/blog' onClick={onClose}><li className="hover:underline cursor-pointer uppercase">Blogs</li></Link>
                <Link to='/media-gallery' onClick={onClose}><li className="hover:underline cursor-pointer uppercase">Media Gallery</li></Link>
                <Link to='/career' onClick={onClose}><li className="hover:underline cursor-pointer uppercase">Careers</li></Link>
                <Link to='/sustainability' onClick={onClose}><li className="hover:underline cursor-pointer uppercase">Sustainability</li></Link>
                <Link to='/review' onClick={onClose}><li className="hover:underline cursor-pointer uppercase">Reviews</li></Link>
                <Link to='/contact' onClick={onClose}><li className="hover:underline cursor-pointer uppercase">Contact</li></Link>
                <Link to='/hotel-policies' onClick={onClose}><li className="hover:underline cursor-pointer uppercase">Policies</li></Link>
            </ul>
        </div>
    )
}

export default NavigationList
