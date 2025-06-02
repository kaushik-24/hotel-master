import { Message } from "../constant/messages";
import { Request, Response } from 'express';
import { StatusCodes } from "../constant/statusCode";
import Booking from "../models/booking.model";
import Room from "../models/room.model";
import Page from "../models/otherPage.model";

class CountController{
 // New method for dashboard stats
  async getDashboardStats(req: Request, res: Response) {
    try {
      const bookingsCount = await Booking.countDocuments();
      const roomsCount = await Room.countDocuments();
      const pagesCount = await Page.countDocuments(); 
      const rooms = await Room.find().select('name totalrooms'); // Fetch all rooms

      const { slug } = req.query;
      let roomDetails = null;
      if (slug && typeof slug === 'string') {
        roomDetails = await Room.findOne({ slug }).select('name totalrooms');
      }

      res.status(StatusCodes.SUCCESS || 200).json({
        status: true,
        data: { 
          bookings: bookingsCount, 
          rooms: roomsCount, 
          pages: pagesCount,
          roomsList: rooms,
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
