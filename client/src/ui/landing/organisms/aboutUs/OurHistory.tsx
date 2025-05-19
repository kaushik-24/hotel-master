import { image } from "@config/constant/image"
import HistoryLeft from "@ui/landing/molecules/HistoryLeft"
import HistoryRight from "@ui/landing/molecules/HistoryRight"

const OurHistory = () => {
    return (
        <div className="bg-[#f6e6d6] sm:py-10 md:pb-5-0  ">
            <div className="hidden md:flex justify-end w-full h-[200px] ">
                <img src={image?.historyTop} alt="" className="h-[200px] " />
            </div>

            <div className="px-20 pb-20">
                <h1 className="uppercase font-poppins text-[14px] text-[#5b3423]  ">our history</h1>
                <p className="font-nanum text-[55px] md:text-[60px] text-[#5b3423] w-full md:max-w-[900px] leading-[1.1] ">
                    The story of Hotel Venus is one of heritage, growth, and a deep connection to the roots of the Himalayas.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between px-20 gap-y-5 md:gap-x-5">

                <HistoryLeft />
                <HistoryRight />


            </div>
        </div>
    )
}

export default OurHistory
