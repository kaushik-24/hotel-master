import axiosInstance from "@services/instance";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineBedroomParent, MdOutlineBook, MdOutlineMeetingRoom, MdOutlineWeb } from "react-icons/md";
import { DashboardStatsResponse, RoomsResponse, Stats } from "@interface/dashboardstats.interface" 

interface Room {
  roomNumber: number; // Changed to number
  roomType: string;
}

interface Hall {
  hallNumber: number;
  hallType: string;
}

interface HallGroup {
  [key: string]: number[];
}


interface RoomGroup {
  [key: string]: number[]; // Changed to number[]
}

const AdminDashboard = () => {
    //total numbers of rooms, booking and pages
    const fetchStats = () => axiosInstance
    .get("/api/dashboardstats")
    .then((res) => res.data);
    ;

    const { data, isLoading, error } = useQuery<DashboardStatsResponse>({
      queryKey: ['dashboardStats'],
      queryFn: fetchStats,
      staleTime: 60000, // Cache for 1 minute
      retry: 1, // Reduce retries for Render spin-down
     
});

  if (isLoading) return <div>Loading...</div>;

  const stats: Stats = error
        ? {
              rooms: 0, 
              bookings: 0,
              pages: 0,
              roomsList: [], 
              halls: 0,
              hallsList: [],
          }
        : {
              rooms: data?.data?.rooms ?? 0,
              bookings: data?.data?.bookings ?? 0,
              pages: data?.data?.pages ?? 0,
              roomsList: data?.data?.roomsList as { roomNumber: number; roomType: string}[] ?? [],
              halls: data?.data?.halls ?? 0,
              hallsList: data?.data?.hallsList as { hallNumber: number; hallType: string}[] ?? [],
          };
    //fetching room informations
    
         return (
            <>
                <div className="bg-gray-100 p-4 font-sans">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Dashboard</h1>
        <p className="text-gray-600 text-sm">Overview of hotel metrics and room details</p>
      </header>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Total Room Types</p>
            <p className="text-2xl font-semibold text-gray-800">{stats.rooms}</p>
          </div>
          <MdOutlineBedroomParent className="text-3xl text-blue-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Total Hall Types</p>
            <p className="text-2xl font-semibold text-gray-800">{stats.halls}</p>
          </div>
          <MdOutlineMeetingRoom className="text-3xl text-blue-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Total Bookings</p>
            <p className="text-2xl font-semibold text-gray-800">{stats.bookings}</p>
          </div>
          <MdOutlineBook className="text-3xl text-green-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Total Pages</p>
            <p className="text-2xl font-semibold text-gray-800">{stats.pages}</p>
          </div>
          <MdOutlineWeb className="text-3xl text-purple-500" />
        </div>
      </div>

      {/* Room Details Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Room Details</h2>
        {stats.roomsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(
              stats.roomsList.reduce((acc: RoomGroup, room: Room) => {
                if (!acc[room.roomType]) {
                  acc[room.roomType] = [];
                }
                acc[room.roomType].push(room.roomNumber);
                return acc;
              }, {})
            ).map(([roomType, roomNumbers]: [string, number[]]) => (
              <div
                key={roomType}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-102"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Room Type</p>
                    <p className="text-xl font-semibold text-gray-900 capitalize">{roomType}</p>
                  </div>
                  <MdOutlineBedroomParent className="text-3xl text-blue-600 hover:text-blue-700 transition-colors duration-200" />
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500 font-medium">Room Numbers</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {roomNumbers
                      .sort((a, b) => a - b)
                      .map((number) => (
                        <span
                          key={number}
                          className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-300 hover:bg-blue-200 transition-colors duration-200"
                        >
                          {number}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-sm font-medium bg-gray-100 py-2 rounded-lg">
            No Rooms Available
          </div>
        )}
      </div>

      {/* Hall Details Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Hall Details</h2>
        {stats.hallsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(
              stats.hallsList.reduce((acc: HallGroup, hall: Hall) => {
                if (!acc[hall.hallType]) {
                  acc[hall.hallType] = [];
                }
                acc[hall.hallType].push(hall.hallNumber);
                return acc;
              }, {})
            ).map(([hallType, hallNumbers]: [string, number[]]) => (
              <div
                key={hallType}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-102"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Hall Type</p>
                    <p className="text-xl font-semibold text-gray-900 capitalize">{hallType}</p>
                  </div>
                  <MdOutlineMeetingRoom className="text-3xl text-blue-600 hover:text-blue-700 transition-colors duration-200" />
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500 font-medium">Hall Numbers</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hallNumbers
                      .sort((a, b) => a - b)
                      .map((number) => (
                        <span
                          key={number}
                          className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-300 hover:bg-blue-200 transition-colors duration-200"
                        >
                          {number}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-sm font-medium bg-gray-100 py-2 rounded-lg">
            No Halls Available
          </div>
        )}
      </div>
    </div>               
            </>
            )
}

export default AdminDashboard
