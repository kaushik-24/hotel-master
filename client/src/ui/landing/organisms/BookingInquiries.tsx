import HotelInfo from "@ui/common/molecules/HotelInfo";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const BookingInquiries: React.FC = () => {
  return (
    <div className="bg-[#5b3423] text-[#ffeedc] py-8 px-4 sm:px-6 md:py-6 md:px-8 lg:py-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <div>
        <p className="uppercase font-poppins text-[10px] sm:text-[12px] md:text-[13px] mb-2 tracking-wider">
          Booking & Inquiries
        </p>
        <p className="font-nanum text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] mb-4 max-w-lg leading-tight">
          We’d love to assist with your inquiries or booking requests.
        </p>
      </div>
      <div className="flex flex-col gap-3 mt-4 sm:mt-0 animate-fadeInUp">
        
        <HotelInfo />
        <Link to={"/booking"}>
        <button className="uppercase font-poppins text-[10px] sm:text-[11px] bg-[#fffcf1] text-[#4F2F1F] px-3 py-1.5 rounded-md hover:bg-[#734735] hover:text-[#fffcf1] transition ">
          Book Now
        </button>
        </Link>
      </div>
    </div>
  );
};

export default BookingInquiries;
