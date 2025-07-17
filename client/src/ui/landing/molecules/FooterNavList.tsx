import { Link } from "react-router-dom"

const FooterNavList = () => {
    return (
        <div>
            <ul className="font-poppins uppercase text-[#5b3423] text-[14px] leading-10">
                <Link to='/about-us' ><li className="hover:underline cursor-pointer">About</li></Link>
                <Link to='/blog' ><li className="hover:underline cursor-pointer ">Blogs</li></Link>
                <Link to='/policy'><li className="hover:underline cursor-pointer uppercase">Policies</li></Link>
                <Link to='/contact' ><li className="hover:underline cursor-pointer uppercase">Contact</li></Link>
            </ul>
        </div>
    )
}

export default FooterNavList
