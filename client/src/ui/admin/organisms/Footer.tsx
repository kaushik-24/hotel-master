const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically

    return (
        <div className="bg-[#ffffff] text-[#a5abcc] border-[1px] border-[#e4e4f4] shadow-md  h-14 flex items-center">
            <span className="font-poppins text-sm px-8">
                Copyright © {currentYear} Hotel Venus. All rights reserved.
            </span>
        </div>
    )
}

export default Footer;
