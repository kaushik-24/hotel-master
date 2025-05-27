import { Message } from "../constant/messages";
import { Request, Response } from 'express';
import { StatusCodes } from "../constant/statusCode";
import Booking from "../models/booking.model";
import Room from "../models/room.model";

class CountController{
 // New method for dashboard stats
  async getDashboardStats(req: Request, res: Response) {
    try {
      const bookingsCount = await Booking.countDocuments();
      const roomsCount = await Room.countDocuments();
      //const pagesCount = await Page.countDocuments(); // Or e.g., pagesCount = 5 if static
      res.status(StatusCodes.SUCCESS || 200).json({
        status: true,
        data: { bookings: bookingsCount, rooms: roomsCount, },
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
