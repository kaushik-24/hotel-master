
export interface DashboardStatsResponse {
    status: boolean;
    data: {
        rooms: number;
        bookings: number;
        pages: number;
        roomsList: { name: string; totalrooms: number }[];
    };
    message: string;
}

export interface Stats {
  rooms: number;
  bookings: number;
  pages: number;
  roomsList: { name: string; totalrooms: number }[];
}

export interface RoomsResponse {
  status: boolean;
  data: { _id: string; name: string; slug: string; totalrooms: number }[];
  message: string;
}

