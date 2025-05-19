import { image } from "@config/constant/image"
import RoomDescription from "../atoms/RoomDescription"
import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"
import RoomFacilities from "../molecules/RoomFacilities"

const WenchengSuite = () => {
    return (
        <div className="bg-[#f6e6d6] flex flex-col justify-center ">

            <div>
                <RoomHeading headingText="Wencheng Suite" />
                <RoomSlogan slogan="TIBETO-CHINESE SENSIBILITIES" />
                <RoomDescription
                    description={"Epitomizing Tibetan and Chinese cultural splendor, the opulent Wencheng Suite immerses guests in royal elegance."} />
            </div>

            <div className="bg-[#ffeedc] ">
                <div className="px-5 md:px-20 py-5  object-cover">
                    <img src={image.wenchengSuit} alt="" />
                </div>
            </div>

            <div className="flex flex-col ">
                <RoomHeading headingText={"A harmony between traditional and modern luxury"} headingSize={"text-[50px] md:text-[66px]"} />
                <div className="flex justify-center  flex-col md:flex-row gap-y-5  md:gap-x-5 px-10 w-full my-10">
                    <p className="text-[17px] font-poppins max-w-[445px]">
                        A tribute to the legendary Princess Wencheng, the suite captures the essence of ancient Tibetan
                        and Chinese royalty. Lavish silk, handcrafted Tibetan rugs and exquisite details echo Princess Wencheng’s
                        legacy of cultural harmony.
                    </p>


                    <p className="text-[17px] font-poppins max-w-[445px] ">
                        The in-suite bathtub overlooking the cityscape is a slice of modern comfort.
                        The bedroom boasts a king-sized bed wrapped in the finest linens and
                        a sitting area perfect for relaxing.
                    </p>
                </div>
            </div>
            <div>
                <RoomFacilities roomName={"Wencheng Suite"} />
            </div>

        </div>
    )
}

export default WenchengSuite
