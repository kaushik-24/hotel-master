import { Link } from "react-router-dom"

interface RoomSlogan {
    slogan: string
}
const RoomSlogan: React.FC<RoomSlogan> = ({ slogan }) => {
    return (
        <Link to='/home'>
            <div className="flex justify-center items-center   gap-x-3">
                <hr className="flex-grow  border-t border-[#5b3423] " />
                <p className="uppercase  flex justify-center text-[14px] text-[#4f2f1f] font-poppins whitespace-nowrap">
                    {slogan}
                </p>
                <hr className="flex-grow border-t border-[#5b3423]" />
            </div>
        </Link>
    )
}

export default RoomSlogan
