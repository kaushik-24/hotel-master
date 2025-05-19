import { image } from "@config/constant/image"
import RoomDescription from "../atoms/RoomDescription"
import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"
import RoomFacilities from "../molecules/RoomFacilities"

const BhrikutiSuite = () => {
    return (
        <div className="bg-[#f6e6d6] flex flex-col justify-center ">

            <div>
                <RoomHeading headingText="Bhrikuti Suite" />
                <RoomSlogan slogan="MADE FOR A QUEEN" />
                <RoomDescription
                    description={"Modern amenities meet a slice of Newa royal past in the Bhrikuti Newari Suite."} />
            </div>

            <div className="bg-[#ffeedc] ">
                <div className="px-5 md:px-20 py-5  object-cover">
                    <img src={image.bhrikuriSuiteTwo} alt="" />
                </div>
            </div>

            <div className="flex flex-col ">
                <RoomHeading headingText={"Sweeping views from your room"} headingSize={"text-[50px] md:text-[66px]"} />
                <div className="flex justify-center  flex-col md:flex-row gap-y-5  md:gap-x-5 px-10 w-full my-10">
                    <p className="text-[17px] font-poppins max-w-[445px]">
                        The Bhrikuti Newari Suite at Hotel Shambala is a majestic tribute to the ancient Newa royalty,
                        inspired by Emperor Songtsan Gampo’s Newa wife, Princess Bhrikuti.
                        Stepping into this suite is like stepping back in time, where opulence and grandeur reign supreme.
                        The Bhrikuti Suite is a true masterpiece, capturing the regal spirit of Nepal’s rich history and culture.
                    </p>


                    <p className="text-[17px] font-poppins max-w-[445px] ">
                        The suite includes a private bathtub and a spacious seating area amongst other complimentary offerings
                        as part of the stay. The essence of Newari craftsmanship graces every corner,
                        with intricate wood carvings, hand-crafted furniture, and traditional Newari fabric.
                    </p>
                </div>
            </div>
            <div>
                <RoomFacilities roomName={"Bhrikuti Suite"} />
            </div>

        </div>
    )
}

export default BhrikutiSuite
