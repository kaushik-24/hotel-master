import axiosInstance from "@services/instance";
import Logo from "@ui/common/molecules/Logo";
import Social from "@ui/common/molecules/Social";
import { useEffect, useState } from "react";
import { MdOutlineMail, MdOutlinePhone, MdOutlineWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";

interface MenuProps {
    onClose: () => void;
}

interface InfoSections {
  _id: string;
  name: string;
  address: string;
  phoneNumbers: string[];
  whatsapp: string;
  enquiryEmail: string;
  contactEmail: string;
}


const MenuLeft: React.FC<MenuProps> = ({ onClose }) => {
    
    const [contact, setContact] = useState<InfoSections>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axiosInstance.get("/api/siteinfo");
        setContact(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch infosections");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

    return (
        <div className="flex flex-col gap-y-20">
            <Logo onClose={onClose} />
            <div className="flex flex-col justify-around items-center gap-y-5">

                <div className="flex flex-col justify-center items-center gap-y-5">
                    <h1 className="font-nanum text-[28px]">{contact?.name}</h1>
                    <p className="font-poppins text-[15px]">{contact?.address}</p>
                    <p></p>
                </div>

                <div className="flex flex-col justify-center items-center">
                    { contact?.phoneNumbers.map((numbers) => 
                    <p className="flex items-center gap-x-2"><MdOutlinePhone /> {numbers}</p>
          )}
                    <p className="flex items-center gap-x-2"><MdOutlineWhatsapp />{contact?.whatsapp}</p>
                    <div className="mb-3">
                        <p className="">For general enquiries :</p>
                        <p className="flex items-center gap-x-2 hover:underline cursor-pointer">
                        <MdOutlineMail />
                        {contact?.contactEmail}
                    </p>
                    </div>
                    
                    <div className="mb-3">
                        <p className="">For corporate enquiries :</p>
                        <p className="flex items-center gap-x-2 hover:underline cursor-pointer">
                        <MdOutlineMail />
                        {contact?.enquiryEmail}
                    </p>
                    </div>
                </div>
                <Link to={"/booking"}>
                <button
                    className="hidden md:flex border-2 border-[#ffeedc]  rounded-sm py-2 px-4 hover:bg-[#ffeedc] hover:text-[#5b3423] cursor-pointer mt-2" >
                    Book Now
                </button>
                </Link>

            </div>

            <Social />
        </div>
    )
}

export default MenuLeft
