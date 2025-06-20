import mongoose from 'mongoose';

export interface IBooking extends mongoose.Document {
    name: string;
    email: string;
    numberOfRoom: number;
    rooms?: string[]; // Changed from ObjectId[] to string[]
    roomNames?: string[];
    checkInDate?: Date;
    checkOutDate?: Date;
}
