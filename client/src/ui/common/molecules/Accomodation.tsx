import { Link } from "react-router-dom";
interface MenuProps {
    onClose?: () => void;
}
const Accomodation: React.FC<MenuProps> = ({ onClose }) => {
    return (
        <div className="flex flex-1 flex-col gap-y-4">
            <p className="uppercase text-[14px] tracking-wider font-poppins hover:underline">Accomodation</p>

            <ul className="font-nanum text-[28px] flex flex-col gap-y-2 ">
                <Link to='/rooms/deluxe' onClick={onClose} ><li className="hover:underline cursor-pointer">Delux Room</li></Link>
                <Link to='/rooms/executive' onClick={onClose}><li className="hover:underline cursor-pointer">Executive Room</li></Link>
                <Link to='/rooms/songtsan-gampo' onClick={onClose}><li className="hover:underline cursor-pointer">Songstan Gampo Suite</li></Link>
                <Link to='/rooms/bhrikuti-suite' onClick={onClose}><li className="hover:underline cursor-pointer">Bhrikuti Newari Suite</li></Link>
                <Link to='/rooms/wencheng-suite' onClick={onClose}> <li className="hover:underline cursor-pointer">Wencheng Suite</li></Link>
            </ul>
        </div >
    )
}

export default Accomodation
