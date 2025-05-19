export interface IBookingInput {
    name: string;
    numberOfRoom: number;
    rooms?: string[];
    checkInDate?: Date;
    checkOutDate?: Date;
}