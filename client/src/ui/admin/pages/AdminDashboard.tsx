import axiosInstance from "@services/instance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@ui/common/organisms/toast/ToastManage";
import axios from "axios";
import { MdOutlineBedroomParent } from "react-icons/md";

interface DashboardStatsResponse {
    status: boolean;
    data: {
        rooms: number;
        bookings: number;
    };
    message: string;
}
const AdminDashboard = () => {
    const fetchStats = () => axiosInstance
    .get("/api/dashboardstats")
    .then((res) => res.data);

    const { data, isLoading, error } = useQuery<DashboardStatsResponse>({
      queryKey: ['dashboardStats'],
      queryFn: fetchStats,
      staleTime: 60000, // Cache for 1 minute
      retry: 1, // Reduce retries for Render spin-down
     
});
  if (isLoading) return <div>Loading...</div>;

  const stats = error
        ? {
              rooms: 0, 
              bookings: 0,
              pages: 3,
          }
        : {
              rooms: data?.data?.rooms ?? 0,
              bookings: data?.data?.bookings ?? 0,
              pages: 3,
          };
    return (
        <div className=" flex flex-col md:flex-row gap-y-8 md:gap-x-8 justify-between ">

            <div className="w-full flex gap-x-10 justify-center items-center bg-[#ffffff] px-7 py-8 border-2 border-[#e4e4f4] shadow-xl rounded-sm ">
                <div className="">
                    <p className="font-poppins text-sm">Total Rooms</p>
                    <p className="font-poppins font-medium text-5xl "> {stats.rooms}</p>
                </div>
                <MdOutlineBedroomParent size={40} />
            </div>

            <div className="w-full flex gap-x-10 justify-center items-center bg-[#ffffff] px-7 py-8 border-2 border-[#e4e4f4] shadow-xl rounded-sm ">
                <div className="">
                    <p className="font-poppins text-sm">Total Bookings</p>
                    <p className="font-poppins font-medium text-5xl ">{stats.bookings}</p>
                </div>
                <MdOutlineBedroomParent size={40} />
            </div>

            <div className="w-full flex gap-x-10 justify-center items-center bg-[#ffffff] px-7 py-8 border-2 border-[#e4e4f4] shadow-xl rounded-sm ">
                <div className="">
                    <p className="font-poppins text-sm">Total Pages</p>
                    <p className="font-poppins font-medium text-5xl ">3</p>
                </div>
                <MdOutlineBedroomParent size={40} />
            </div>
        </div>
    )
}

export default AdminDashboard
