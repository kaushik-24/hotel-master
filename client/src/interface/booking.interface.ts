// booking.interface.ts
// Interface for the existing booking data from the API
export interface GetBookingList {
    _id: string;
    id: string;
    email: string;
    roomImage: string;
    name: string;
    numberOfRoom: number;
    rooms: string[];
    roomNames: string[];
    checkInDate: string;
    checkOutDate: string;
    idImage: string;
}

// Interface for the form submission data (excludes server-generated fields)
export interface BookingFormData {
    name: string;
    email: string;
    numberOfRoom: number;
    rooms: string[];
    roomNames: string[];
    checkInDate: string;
    checkOutDate: string;
    roomPrice: number;
    idImage: string;
}

// Optional: Type to pick only the fields we need from GetBookingList
export type CreateBookingData = Pick<GetBookingList, 'name' | 'numberOfRoom' | 'rooms' | 'checkInDate' | 'checkOutDate'>;

