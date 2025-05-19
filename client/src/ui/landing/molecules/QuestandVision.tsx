import { quest } from "@data/questAndValues"

const QuestandVision = () => {
    return (
        <div className="mb-10 md:mb-20">
            <div className="leading-[1.1] mb-10">
                <h1 className="font-nanum text-[52px] md:text-[66px] text-[#5b3423] ">Our Quest & Vision</h1>
                <p className="uppercase font-poppins text-[#5b3423] text-[12px] md:text-[14px] ">
                    Offering rest, recovery, and introspection with outstanding hospitality.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                {quest.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <h2 className="text-[24px] font-nanum text-[#5B3423] mb-4">{item.topic}</h2>
                        <p className="text-[16px] font-poppins text-[#4F2F1F] max-w-[450px] ">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestandVision
