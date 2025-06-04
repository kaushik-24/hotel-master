import HotelInfo from "@ui/common/molecules/HotelInfo"
import { MdEmail } from "react-icons/md"


const BookingInquiries = () => {
    return (
                 <div className="bg-[#4f2f21] text-[#ffeedc] py-12 px-6 md:py-6 md:px-6 lg:py-8 lg:px-32 grid grid-cols-1 sm:grid-cols-2 gap-6">
  <div>
    <p className="uppercase font-poppins text-[12px] mb-3 md:text-[14px]">booking & inquiries</p>
    <p className="font-nanum text-[28px] md:text-[36px] lg:text-[36px] mb-6 max-w-2xl leading-snug">
      We would love to hear from you and assist with any inquiries or booking requests you may have.
    </p>
  </div>
  <div className="flex flex-col gap-4 mt-6 animate-fadeInUp">
    <HotelInfo />
    <button className="uppercase tracking-widest font-poppins text-[12px] bg-[#fffcf1] text-[#4F2F1F] px-4 py-2 hover:bg-[#734735] hover:text-[#fffcf1] transition">
      Book Now
    </button>
    <button className="uppercase tracking-widest font-poppins text-[12px] text-[#fffcf1] border-2 border-[#fffcf1] px-4 py-2 hover:bg-[#fffcf1] hover:text-[#4f2f1f] transition flex items-center gap-2">
      <MdEmail size={16} />
      Contact
    </button>
  </div>
</div> 
            )
}

export default BookingInquiries
