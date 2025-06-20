export interface IBookingInput {
    name: string;
    email: string;
    numberOfRoom: number;
    rooms?: string[];
    roomNames?: string[];
    checkInDate?: Date;
    checkOutDate?: Date;
}
