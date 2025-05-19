import { MdOutlineBedroomParent } from "react-icons/md";

const AdminDashboard = () => {
    return (
        <div className=" flex flex-col md:flex-row gap-y-8 md:gap-x-8 justify-between ">

            <div className="w-full flex gap-x-10 justify-center items-center bg-[#ffffff] px-7 py-8 border-2 border-[#e4e4f4] shadow-xl rounded-sm ">
                <div className="">
                    <p className="font-poppins text-sm">Total Rooms</p>
                    <p className="font-poppins font-medium text-5xl ">5</p>
                </div>
                <MdOutlineBedroomParent size={40} />
            </div>

            <div className="w-full flex gap-x-10 justify-center items-center bg-[#ffffff] px-7 py-8 border-2 border-[#e4e4f4] shadow-xl rounded-sm ">
                <div className="">
                    <p className="font-poppins text-sm">Total Rooms</p>
                    <p className="font-poppins font-medium text-5xl ">5</p>
                </div>
                <MdOutlineBedroomParent size={40} />
            </div>

            <div className="w-full flex gap-x-10 justify-center items-center bg-[#ffffff] px-7 py-8 border-2 border-[#e4e4f4] shadow-xl rounded-sm ">
                <div className="">
                    <p className="font-poppins text-sm">Total Rooms</p>
                    <p className="font-poppins font-medium text-5xl ">5</p>
                </div>
                <MdOutlineBedroomParent size={40} />
            </div>
        </div>
    )
}

export default AdminDashboard
