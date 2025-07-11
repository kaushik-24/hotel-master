import mongoose from 'mongoose';
import Room from '../models/room.model';
import Print from '../utils/print';

interface Env {
  DATABASE_HOST: string;
  DB_NAME: string;
}

const connectDB = async (env: Env) => {
  try {
    await mongoose.connect(env.DATABASE_HOST, {
      dbName: env.DB_NAME,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
    });
    Print.info('Connected to MongoDB');
    // Comment out unless needed
    // await Room.collection.drop();
    // Print.info('Room collection dropped');
    return mongoose.connection;
  } catch (error) {
    Print.error('MongoDB connection error: ' + error.message);
    throw error;
  }
};

export default connectDB;
