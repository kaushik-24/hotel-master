import mongoose from 'mongoose';

const uri = process.env.DATABASE_HOST || 'mongodb+srv://grg23kaushik:lPBUG4axqMy7ACfs@hoteldb.j7fmbsm.mongodb.net/?retryWrites=true&w=majority&appName=hoteldb'; // MongoDB URI
const dbName = process.env.DB_NAME || 'hoteldb'; // Database name

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            dbName,                 // Database name
            connectTimeoutMS: 30000,   // 30s connection timeout
            socketTimeoutMS: 30000,    // 30s socket timeout
            maxPoolSize: 10,            // Connection pool size (updated)
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export default connectDB;
