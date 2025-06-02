import axiosInstance from "@services/instance";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineBedroomParent, MdOutlineBook, MdOutlineCheckCircle, MdOutlineWeb } from "react-icons/md";
import { DashboardStatsResponse, RoomsResponse, Stats } from "@interface/dashboardstats.interface" 

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
          }
        : {
              rooms: data?.data?.rooms ?? 0,
              bookings: data?.data?.bookings ?? 0,
              pages: data?.data?.pages ?? 0,
              roomsList: data?.data?.roomsList as { name: string; totalrooms: number }[] ?? [],
              
          };
    //fetching room informations
    
         return (
            <>
              <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hotel Dashboard</h1>
        <p className="text-gray-600">Overview of hotel metrics and room details</p>
      </header>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Room Types</p>
            <p className="text-3xl font-semibold text-gray-800">{stats.rooms}</p>
          </div>
          <MdOutlineBedroomParent className="text-4xl text-blue-500" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-3xl font-semibold text-gray-800">{stats.bookings}</p>
          </div>
          <MdOutlineBook className="text-4xl text-green-500" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Pages</p>
            <p className="text-3xl font-semibold text-gray-800">{stats.pages}</p>
          </div>
          <MdOutlineWeb className="text-4xl text-purple-500" />
        </div>
      </div>

      {/* Room Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Room Details</h2>
        {stats.roomsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.roomsList.map((room) => (
              <div
                key={room.name}
                className="bg-gray-50 p-4 rounded-md border border-gray-200 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div>
                  <p className="text-sm text-gray-500">Total Rooms for {room.name}</p>
                  <p className="text-2xl font-semibold text-gray-800">{room.totalrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rooms Booked </p>
                  <p className="text-2xl font-semibold text-gray-800">{room.totalrooms}</p>
                </div>
                <MdOutlineBedroomParent className="text-3xl text-blue-500" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No Rooms Available</div>
        )}
      </div>
    </div>
            </>
            )
}

export default AdminDashboard
