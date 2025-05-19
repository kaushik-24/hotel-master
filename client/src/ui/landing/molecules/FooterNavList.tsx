import { Link } from "react-router-dom"

const FooterNavList = () => {
    return (
        <div>
            <ul className="font-poppins uppercase text-[#5b3423] text-[14px] leading-10">
                <Link to='/about-us' ><li className="hover:underline cursor-pointer">About</li></Link>
                <li className="hover:underline cursor-pointer">Places & sights</li>
                <li className="hover:underline cursor-pointer">infinity pool</li>
                <li className="hover:underline cursor-pointer">conference</li>
                <li className="hover:underline cursor-pointer">Wellness</li>
                <li className="hover:underline cursor-pointer">eat & drink</li>
                <li className="hover:underline cursor-pointer">offers</li>
                <Link to='/sustainability'><li className="hover:underline cursor-pointer ">Sustainability</li></Link>
                <Link to='/blog' ><li className="hover:underline cursor-pointer ">Blogs</li></Link>
                <Link to='/hotel-policies'><li className="hover:underline cursor-pointer uppercase">Policies</li></Link>
                <Link to='/review'><li className="hover:underline cursor-pointer ">Reviews</li></Link>
                <Link to='/contact' ><li className="hover:underline cursor-pointer uppercase">Contact</li></Link>
            </ul>
        </div>
    )
}

export default FooterNavList
