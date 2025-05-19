import mongoose from 'mongoose';

export interface IBooking extends mongoose.Document {
    name: string;
    numberOfRoom: number;
    rooms?: string[]; // Changed from ObjectId[] to string[]
    checkInDate?: Date;
    checkOutDate?: Date;
}