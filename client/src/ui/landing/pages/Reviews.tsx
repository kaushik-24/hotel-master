import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"

const Reviews = () => {
    return (
        <div className=" bg-[#f6e6d6] flex flex-col justify-center pb-10  ">
            <div className="">
                <RoomHeading headingText="Reviews" />
                <RoomSlogan slogan="Hear all about us from our guests." />
                {/* <RoomDescription
                    description={"At Hotel Shambala, we understand the urgency to fight global warming and are deeply committed to environmental sustainability in every way possible."} /> */}
            </div>



        </div>
    )
}

export default Reviews
