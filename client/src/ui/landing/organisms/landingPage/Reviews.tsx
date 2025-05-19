import ReviewCarousal from "@ui/landing/molecules/ReviewCarousal"

const Reviews = () => {
    return (
        <div className="bg-[#ffeedc] flex flex-col md:flex-row px-20 py-10">
            <div className="max-w-[456px]">
                <h1 className="font-poppins text-[12px] md:text-[14px] text-[#5b3423] uppercase tracking-widest mb-8 ">Reviews</h1>
                <p className="max-w-[800px] font-nanum text-[45px] md:text-[55px] text-[#5b3423]" >Hear all about us from our guests.</p>
            </div>

            <div>
                <ReviewCarousal />
            </div>
        </div>
    )
}

export default Reviews
