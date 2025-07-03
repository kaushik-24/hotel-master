import { Message } from "../constant/messages";
import { Request, Response } from 'express';
import { StatusCodes } from "../constant/statusCode";
import Booking from "../models/booking.model";
import RoomType from "../models/roomType.model";
import Page from "../models/otherPage.model";
import Room from "../models/room.model";
import Hall from "../models/hall.model";
import HallNumber from "../models/hallNumber.model";

class CountController {
  async getDashboardStats(req: Request, res: Response) {
    try {
      const bookingsCount = await Booking.countDocuments();
      const roomsCount = await RoomType.countDocuments();
      const pagesCount = await Page.countDocuments();
      const rooms = await Room.find()
        .select('roomNumber roomType roomTypeName isAvailable')
        .populate('roomType', 'name')
        .lean();
      const halls = await HallNumber.find().select('hallNumber hallType').lean();
      const hallsCount = await Hall.countDocuments();

      // Debug log for raw room data
      console.log('Raw rooms from DB:', rooms);

      // Ensure isAvailable is a boolean
      const formattedRooms = rooms.map(room => ({
        ...room,
        isAvailable: room.isAvailable !== undefined ? Boolean(room.isAvailable) : true, // Default to true if undefined
      }));

      console.log('Formatted rooms:', formattedRooms); // Debug log

      res.status(StatusCodes.SUCCESS || 200).json({
        status: true,
        data: {
          bookings: bookingsCount,
          rooms: roomsCount,
          pages: pagesCount,
          roomsList: formattedRooms,
          halls: hallsCount,
          hallsList: halls,
        },
        message: Message.fetched,
      });
    } catch (error: any) {
      console.error('Error Fetching Dashboard Stats:', error);
      res.status(StatusCodes.BAD_REQUEST || 400).json({
        status: false,
        message: error.message || 'An error occurred while fetching dashboard stats.',
      });
    }
  }
}

export default CountController;
