
export interface DashboardStatsResponse {
    status: boolean;
    data: {
        rooms: number;
        bookings: number;
        pages: number;
        roomsList: { roomNumber: number; roomType: string }[];
        hallsList: { hallNumber: number; hallType: string }[];
        halls: number;
    };
    message: string;
}

export interface Stats {
  rooms: number;
  bookings: number;
  pages: number;
  roomsList: { roomNumber: number; roomType: string}[];
  hallsList: { hallNumber: number; hallType: string }[];
  halls: number;
}

export interface RoomsResponse {
  status: boolean;
  data: { _id: string; name: string; slug: string; totalrooms: number }[];
  message: string;
}

