import { image } from "@config/constant/image"
import RoomDescription from "../atoms/RoomDescription"
import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"
import RoomFacilities from "../molecules/RoomFacilities"

const Executive = () => {
    return (
        <div className="bg-[#f6e6d6] flex flex-col justify-center ">

            <div>
                <RoomHeading headingText="Executive Room" />
                <RoomSlogan slogan="A dash of luxury" />
                <RoomDescription
                    description={"The Executive Rooms of Hotel Shambala offers splendor comfort with panoramic views of Kathmandu and carefully planned amenities for a relaxing stay."} />
            </div>

            <div className="bg-[#ffeedc] ">
                <div className="px-5 md:px-20 py-5  object-cover">
                    <img src={image.executiveTwo} alt="" />
                </div>
            </div>

            <div className="flex flex-col ">
                <RoomHeading headingText={"Sweeping views from your room"} headingSize={"text-[50px] md:text-[66px]"} />
                <div className="flex justify-center  flex-col md:flex-row gap-y-5  md:gap-x-5 px-10 w-full my-10">
                    <div className="flex flex-col gap-y-2">
                        <p className="text-[17px] font-poppins max-w-[445px]">
                            Nestled on the hotel’s top two floors, these rooms offer unrivaled views of the city or the majestic mountains.
                        </p>

                        <p className="text-[17px] font-poppins max-w-[445px]">
                            The rooms feature a thoughtful selection of amenities designed to enhance our guests’ experience.
                        </p>
                    </div>

                    <p className="text-[17px] font-poppins max-w-[445px] ">
                        A Bluetooth alarm clock featuring radio capabilities allows guests to wake up to their favorite tunes,
                        while a complimentary fruit basket adds a delightful touch. Complimentary newspapers and magazines
                        add a personal touch to the experience.
                    </p>
                </div>
            </div>
            <div>
                <RoomFacilities roomName={"Executive Room"} />
            </div>

        </div>
    )
}

export default Executive
