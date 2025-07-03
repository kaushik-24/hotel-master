import mongoose from "mongoose";

export interface IRoomType {
    name: string,
    price: number,
    capacity: Number,
    slug: string,
    shortdesc: string,
    features: string[],
    facilities: string,
    description: string,
    roomImage: string, 
    readMore: string,
    heading: string,
    longdesc: string,
    isActive: boolean,
    discount: number,
}

export interface IRoom {
    roomNumber: string,
    roomType: mongoose.Schema.Types.ObjectId | { _id: string; name: string},
    roomTypeName: string,
    floor: string,
    status: string,
    isAvailable: Boolean,
}

