import { values } from "@data/questAndValues"
const CoreValues = () => {
    return (
        <div>
            <div className="leading-[1.1] mb-10">
                <h1 className="font-nanum text-[52px] md:text-[66px] text-[#5b3423] ">Core Values</h1>
                <p className="uppercase font-poppins text-[#5b3423] text-[12px] md:text-[14px] ">
                    BELOW ARE ITS CORE VALUES THAT SERVE AS THE PILLARS OF ITS IDENTITY.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                {values.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <h2 className="text-[24px] font-nanum text-[#5B3423] mb-4">{item.topic}</h2>
                        <p className="text-[16px] font-poppins text-[#4F2F1F] max-w-[450px] ">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CoreValues
