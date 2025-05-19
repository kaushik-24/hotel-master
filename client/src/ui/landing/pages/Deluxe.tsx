import { image } from "@config/constant/image"
import RoomDescription from "../atoms/RoomDescription"
import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"
import RoomFacilities from "../molecules/RoomFacilities"

const Deluxe = () => {
    return (
        <div className="bg-[#f6e6d6] flex flex-col justify-center ">

            <div>
                <RoomHeading headingText="Deluxe Room" />
                <RoomSlogan slogan="Culture Meets Comfort" />
                <RoomDescription
                    description={"The Deluxe rooms at Hotel Shambala offer a unique blend of traditional craftsmanship and modern comfort."} />
            </div>

            <div className="bg-[#ffeedc] ">
                <div className="px-5 md:px-20 py-5  object-cover">
                    <img src={image.deluxetwo} alt="" />
                </div>
            </div>

            <div className="flex flex-col ">
                <RoomHeading headingText={"An intimate space to lounge in"} headingSize={"text-[50px] md:text-[66px]"} />
                <div className="flex justify-center items-center flex-col md:flex-row gap-y-5  md:gap-x-5 px-10 w-full my-10">
                    <p className="text-[17px] font-poppins max-w-[445px] ">
                        Each room is adorned with a Tibetan hand-knotted rug, adding a touch of authenticity to the ambience.
                        A hand-painted Thangka and custom hand-made furniture
                        enhance the room’s character, making it a truly special space.
                    </p>

                    <p className="text-[17px] font-poppins max-w-[445px] ">
                        These rooms celebrate timeless artistry while offering modern amenities. A stay in these rooms promises a harmonious
                        blend of culture and convenience, making the experience truly memorable.
                    </p>
                </div>
            </div>
            <div>
                <RoomFacilities roomName={"Deluxe Room"} />
            </div>

        </div>
    )
}

export default Deluxe
