"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_model_1 = __importDefault(require("../models/room.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.DATABASE_HOST || 'mongodb+srv://grg23kaushik:lPBUG4axqMy7ACfs@hoteldb.j7fmbsm.mongodb.net/?retryWrites=true&w=majority&appName=hoteldb'; // MongoDB URI
const dbName = process.env.DB_NAME || 'hoteldb'; // Database name
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(uri, {
            dbName, // Database name
            connectTimeoutMS: 30000, // 30s connection timeout
            socketTimeoutMS: 30000, // 30s socket timeout
            maxPoolSize: 10, // Connection pool size (updated)
        });
        await room_model_1.default.collection.drop();
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};
exports.default = connectDB;
