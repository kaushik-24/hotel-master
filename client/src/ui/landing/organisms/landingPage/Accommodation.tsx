import RoomsCarousel from "@ui/landing/molecules/RoomsCarousal"

const Accommodation = () => {
    return (
        <div className="bg-[#ffeedc]  py-10 ">
            <div className="px-44 mb-10">
                <h1 className="font-poppins text-[12px] md:text-[14px] text-[#5b3423] uppercase tracking-widest mb-8 ">Accommodation </h1>
                <p className="max-w-[800px] font-nanum text-[44px] md:text-[66px] text-[#5b3423] ">Blend of intricate Tibetan décor and modern comfort.</p>
            </div>

            <RoomsCarousel />
        </div>
    )
}

export default Accommodation
