import axiosInstance from "@services/instance";
import Social from "@ui/common/molecules/Social";
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const ContactInfo = () =>{ 
  
interface ContactData {
  address: string;
  email: string;
  phoneNumber: string[];
  contactImage: string;
}
    
    const [contactData, setContactData] = useState<ContactData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axiosInstance.get("/api/contact");
        setContactData(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch contact data");
      }
    };
    fetchContactData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 px-20 md:px-32 py-20 justify-between  ">

        <div className="flex flex-col gap-y-2">
            <h1 className="font-nanum text-[28px] text-[#5b3423] mb-2">Address</h1>
            <p className="font-poppins text-[17px] ">{contactData?.address}</p>
        </div>
        <div className="flex flex-col gap-y-1 ">
            <h1 className="font-nanum text-[28px] text-[#5b3423] mb-2">Phone Number</h1>
            {contactData?.phoneNumber && contactData.phoneNumber.length > 0 ? (
          <ul className="list-disc pl-5">
            {contactData.phoneNumber.map((phone, index) => (
              <p className=" flex  gap-x-5">
                <FaPhoneAlt />
                <span className="font-poppins text-[17px]">{phone}</span>
            </p>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No phone numbers available.</p>
        )}

            
            

        </div>
        <div className="flex flex-col gap-y-1">
            <h1 className="font-nanum text-[28px] text-[#5b3423] mb-2">E-Mail Address</h1>
            <p className=" font-poppins text-[17px]  ">For general enquiries please contact:</p>
            <p className="flex font-poppins items-center gap-x-2 hover:underline cursor-pointer">
                <MdOutlineMail />{contactData?.email}
            </p>
        </div>
        <div className="flex">
            <Social />
        </div>
    </div>
)
}

export default ContactInfo

