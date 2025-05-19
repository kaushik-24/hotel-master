import { Link } from "react-router-dom"

const FindYouAtVenus = () => {
    return (
        <div className="bg-[#ffeedc] py-20 flex justify-center items-center flex-col animate-fadeInUp">
            <p className="uppercase font-poppins text-[14px] mb-5 text-[#5B3423] tracking-widest animate-fadeInUp">find yourself at venus</p>
            <h1 className="font-nanum text-[#5B3423] text-[54px] animate-fadeInUp">Your Peace Abode in the City</h1>
            <p className="font-nanum text-[#5B3423] text-[28px] mt-10 animate-fadeInUp">
                Hotel Shambala, a Tibetan boutique hotel in Kathmandu<br />
                where Himalayan Serenity Meets Modern Hospitality.
            </p>

            <div className="mt-9 max-w-[600px] text-center">
                <p className="font-poppins text-[17px] mb-5 animate-fadeInUp">
                    At Hotel Shambala, we invite our guests to a peaceful oasis of self-discovery and rejuvenation.
                    Our mantra, “Find yourself at Shambala,” perfectly captures the essence of our
                    unique hospitality inspired.
                </p>

                <p className="font-poppins text-[17px] mb-5 animate-fadeInUp">
                    Whether you seek physical relaxation, spiritual exploration, or mental respite, your stay
                    at our boutique hotel in Kathmandu will embrace you with a sense
                    of tranquility that sets us apart from the ordinary.
                </p>
            </div>

            <div className="flex gap-x-6 animate-fadeInUp ">
                <Link to="/about-us">
                    <button className="uppercase font-poppins text-[12px] text-[#4F2F1F] border-2 border-[#4f2f1f] px-3 py-2 hover:bg-[#4f2f1f] hover:text-[#fffcf1]">
                        explore more
                    </button>
                </Link>
                <Link to="/booking">
                <button className="uppercase font-poppins text-[12px] text-[#4F2F1F] border-2 border-[#4f2f1f] px-3 py-2 hover:bg-[#4f2f1f] hover:text-[#fffcf1]">book now</button>
                </Link>
            </div>
        </div>
    )
}

export default FindYouAtVenus
