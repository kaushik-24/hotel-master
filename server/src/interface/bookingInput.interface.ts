export interface IBookingInput {
    name: string;
    numberOfRoom: number;
    rooms?: string[];
    roomNames?: string[];
    checkInDate?: Date;
    checkOutDate?: Date;
}
