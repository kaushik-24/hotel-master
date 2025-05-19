import HotelInfo from "@ui/common/molecules/HotelInfo"


const BookingInquiries = () => {
    return (
        <div className="bg-[#4f2f21] text-[#ffeedc] py-20 px-32">
            <p className="uppercase font-poppins text-[14px] mb-5">booking & inquiries</p>
            <p className="font-nanum text-[42px] mb-5 max-w-[600px] leading-[1.2]">
                We would love to hear from you and assist with any inquiries or booking requests you may have.
            </p>
            <HotelInfo />

            <div className="flex gap-x-6 animate-fadeInUp ">
                <button className="uppercase tracking-widest font-poppins text-[12px] bg-[#fffcf1] text-[#4F2F1F]  px-3 py-2 hover:bg-[#734735] hover:text-[#fffcf1]">
                    Book Now
                </button>
                <button className="uppercase tracking-widest font-poppins text-[12px] text-[#fffcf1] border-2 border-[#fffcf1] px-3 py-2 hover:bg-[#fffcf1] hover:text-[#4f2f1f]">
                    Contact
                </button>
            </div>
        </div>
    )
}

export default BookingInquiries
