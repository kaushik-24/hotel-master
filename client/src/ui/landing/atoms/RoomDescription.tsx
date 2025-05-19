interface RoomDescriptionProps {
    description: string
}
const RoomDescription: React.FC<RoomDescriptionProps> = ({ description }) => {
    return (
        <div className="w-full flex justify-center my-5  ">
            <p className=" font-nanum  text-[#5b3423] text-[20px] md:text-[28px] text-center max-w-[600px] ">
                {description}
            </p>
        </div>
    )
}

export default RoomDescription
