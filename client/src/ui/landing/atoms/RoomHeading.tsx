interface HeadingProps {
    headingText: React.ReactNode
    headingSize?: string
}

const RoomHeading: React.FC<HeadingProps> = ({ headingText, headingSize = 'text-[52px] md:text-[100px]' }) => {
    return (

        <h1
            className={`flex justify-center w-full  font-nanum text-center ${headingSize} text-[#5b3423] mt-[90px] `}>
            {headingText}
        </h1>
    )
}

export default RoomHeading
