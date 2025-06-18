import mongoose from "mongoose";

export interface IRoomType {
    name: string,
    price: Number,
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
}

export interface IRoom {
    roomNumber: string,
    roomType: mongoose.Schema.Types.ObjectId,
    floor: string,
    status: string,
    isActive: Boolean,
}

