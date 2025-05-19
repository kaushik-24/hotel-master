import { image } from "@config/constant/image"

const HistoryRight = () => {
    return (
        <div className="flex-1">
            <h1 className="font-nanum text-[28px] text-[#5b3423] mb-5">
                A Legacy of Tibetan Hospitality, Crafting Timeless Tranquility Since the 1970s
            </h1>
            <div className="flex justify-start flex-col w-full gap-y-5">
                <p className="text-[17px] font-poppins  ">
                    Originating from a Tibetan family—the Tsatultsangour’s, our
                    journey began in the 1970s when we established a café in the heart
                    of Kathmandu’s historic Freak Street. By the mid-1980s, we had ventured
                    into hospitality with the pioneering Potala Guest House in Thamel—one of
                    the first five hotels to grace the vibrant streets of Thamel.
                </p>

                <p className="text-[17px] font-poppins  ">
                    We opened our doors in December 2014. The same year in July, our CEO Tseten
                    Tsatultsang returned to mark a new chapter in our journey, reflecting our
                    commitment to family, community, and creating a haven for all who seek it.
                </p>
            </div>
            <div>
                <img src={image?.historyTwo} alt="" />
            </div>
        </div>
    )
}

export default HistoryRight
