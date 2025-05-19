import { image } from "@config/constant/image"
import RoomDescription from "../atoms/RoomDescription"
import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"
import RoomFacilities from "../molecules/RoomFacilities"

const GampoSuite = () => {
    return (
        <div className="bg-[#f6e6d6] flex flex-col justify-center ">

            <div>
                <RoomHeading headingText="Songtsan Gampo Suit" />
                <RoomSlogan slogan="FIT FOR A KING" />
                <RoomDescription
                    description={"Tastefully designed in honor of the great Emperor Songtsan Gampo, the suite is a seamless blend of Tibetan heritage and modern comforts."} />
            </div>

            <div className="bg-[#ffeedc] ">
                <div className="px-5 md:px-20 py-5  object-cover">
                    <img src={image.gampoSuitTwo} alt="" />
                </div>
            </div>

            <div className="flex flex-col ">
                <RoomHeading headingText={"Artistically designed and elegantly furnished"} headingSize={"text-[50px] md:text-[66px]"} />
                <div className="flex justify-center  flex-col md:flex-row gap-y-5  md:gap-x-5 px-10 w-full my-10">
                    <p className="text-[17px] font-poppins max-w-[445px]">
                        Comprising a separate living room and a bathroom with a standalone bathtub in the
                        bedroom and a separate shower, this suite offers the utmost in comfort.
                        Adorned with hand-painted Thangkas, hand-knotted rugs, and hand-embroidered wall hangings, it harks back to Tibet’s golden era.
                    </p>


                    <p className="text-[17px] font-poppins max-w-[445px] ">
                        A Bluetooth alarm clock featuring radio capabilities allows guests to wake up to their favorite tunes,
                        while a complimentary fruit basket adds a delightful touch. Complimentary newspapers and magazines
                        add a personal touch to the experience.
                    </p>
                </div>
            </div>
            <div>
                <RoomFacilities roomName={"Songtsan Gampo Suit"} />
            </div>

        </div>
    )
}

export default GampoSuite
