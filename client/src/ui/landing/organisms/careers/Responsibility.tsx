import { responsibility } from "@data/responsibility";
import { MdCheck } from "react-icons/md";

const Responsibility = () => {
    return (
        <div className="px-10 md:px-20 py-10">
            <h1 className="font-nanum text-[28px] text-[#5b3423] pb-2 md:pb-5">Key Responsibility</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-10 ">

                {responsibility.map((item, index) => (
                    <div key={index} className="flex items-center gap-x-5">

                        <MdCheck size={20} className="flex-shrink-0 " />
                        <p className="font-poppins text-[17px] "> {item.points} </p>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Responsibility
