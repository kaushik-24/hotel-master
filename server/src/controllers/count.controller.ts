import { Message } from "../constant/messages";
import { Request, Response } from 'express';
import { StatusCodes } from "../constant/statusCode";
import Booking from "../models/booking.model";
import RoomType from "../models/roomType.model";
import Page from "../models/otherPage.model";
import Room from "../models/room.model";
import Hall from "../models/hall.model";
import HallNumber from "../models/hallNumber.model";

class CountController{
 // New method for dashboard stats
  async getDashboardStats(req: Request, res: Response) {
    try {
      const bookingsCount = await Booking.countDocuments();
      const roomsCount = await RoomType.countDocuments();
      const pagesCount = await Page.countDocuments(); 
      const rooms = await Room.find().select('roomNumber roomType'); // Fetch all rooms
      const halls = await HallNumber.find().select('hallNumber hallType');
      const hallsCount = await Hall.countDocuments();
      
      res.status(StatusCodes.SUCCESS || 200).json({
        status: true,
        data: { 
          bookings: bookingsCount, 
          rooms: roomsCount, 
          pages: pagesCount,
          roomsList: rooms,
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
