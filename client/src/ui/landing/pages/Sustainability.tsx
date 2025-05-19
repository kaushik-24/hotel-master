import RoomDescription from "../atoms/RoomDescription"
import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"

const Sustainability = () => {
    return (
        <div className=" bg-[#f6e6d6] flex flex-col justify-center pb-10  ">
            <div className="">
                <RoomHeading headingText="Sustainability" />
                <RoomSlogan slogan="Our effort to reduce footprint" />
                <RoomDescription
                    description={"At Hotel Shambala, we understand the urgency to fight global warming and are deeply committed to environmental sustainability in every way possible."} />
            </div>
            <div className=" w-full  flex justify-center ">
                <button
                    className="uppercase font-poppins tracking-widest  text-[12px] text-[#ffeedc] px-3 py-3 
                            bg-[#5b3423] hover:bg-[#713f25] mt-10  max-w-[320px] ">
                    Venus Sustainability policies
                </button>
            </div>

        </div>
    )
}

export default Sustainability
