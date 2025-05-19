import { image } from "@config/constant/image"
import RoomDescription from "../atoms/RoomDescription"
import RoomHeading from "../atoms/RoomHeading"
import RoomSlogan from "../atoms/RoomSlogan"
import Responsibility from "../organisms/careers/Responsibility"
import SkillsQuali from "../organisms/careers/SkillsQuali"

const Careers = () => {
    return (
        <div className=" bg-[#f6e6d6] flex flex-col justify-center ">
            <div className="mb-10">
                <RoomHeading headingText="Careers" />
                <RoomSlogan slogan="Your stepping stone at Venus" />
                <RoomDescription
                    description={"Explore opportunities for growth and stability with us."} />
            </div>

            <div className="px-16 md:px-32 py-20">
                <img src={image?.career} alt="" />
            </div>

            <div>
                <div className="px-10 md:px-20  ">
                    <h1 className="uppercase font-poppins text-[14px] text-[#od1724]  " >Current Job Openings</h1>
                    <p className="font-nanum text-[55px] text-[#5b3423] ">Associate Director of Sales</p>
                </div>

                <Responsibility />
                <SkillsQuali />
            </div>

        </div>
    )
}

export default Careers
