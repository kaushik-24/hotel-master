import Social from "@ui/common/molecules/Social";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const ContactInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 px-20 md:px-32 py-20 justify-between  ">

        <div className="flex flex-col gap-y-2">
            <h1 className="font-nanum text-[28px] text-[#5b3423] mb-2">Address</h1>
            <p className="font-poppins text-[17px] ">Bansbari Road Ward No.- 03</p>
            <p className="font-poppins text-[17px] ">Municipality – Kathmandu</p>
            <p className="font-poppins text-[17px] ">District – Kathmandu</p>
        </div>
        <div className="flex flex-col gap-y-1 ">
            <h1 className="font-nanum text-[28px] text-[#5b3423] mb-2">Phone Number</h1>

            <p className=" flex  gap-x-5">
                <FaPhoneAlt />
                <span className="font-poppins text-[17px]">+977 1 4650251</span>
            </p>
            <p className=" flex gap-x-5">
                <FaPhoneAlt /> <span className="font-poppins text-[17px]">+977 1 4650351</span>
            </p>
            <p className=" flex gap-x-5">
                <FaWhatsapp /> <span className="font-poppins text-[17px]">+977 9808209299</span>
            </p>

        </div>
        <div className="flex flex-col gap-y-1">
            <h1 className="font-nanum text-[28px] text-[#5b3423] mb-2">E-Mail Address</h1>
            <p className=" font-poppins text-[17px]  ">For general enquiries please contact:</p>
            <p className="flex font-poppins items-center gap-x-2 hover:underline cursor-pointer">
                <MdOutlineMail />
                info@venushotel.com
            </p>
            <p className="font-poppins text-[17px]  ">For corporate or group</p>
            <p className="flex font-poppins items-center gap-x-2 hover:underline cursor-pointer">
                <MdOutlineMail />
                sales@venushotel.com
            </p>
        </div>
        <div className="flex">
            <Social />
        </div>
    </div>
)

export default ContactInfo
