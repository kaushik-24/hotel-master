// src/routes/booking.route.ts
import { Router } from "express";
import BookingController from "../controllers/booking.controller";
import { CreateBookingDTO } from "../dto/booking.dto";
import RequestValidator from "../middleware/Request.Validator";
import { catchAsync } from "../utils/CatchAsync.utils";

const bookingController = new BookingController();
const router = Router();

router.post(
    '/',
    RequestValidator.validate(CreateBookingDTO),
    catchAsync(bookingController.createBooking)
);

router.get(
    '/',
    catchAsync(bookingController.getAllBookings)
);

router.get(
    '/:bookingId',
    catchAsync(bookingController.getBookingById)
);

router.delete(
    '/:bookingId',
    catchAsync(bookingController.deleteBooking)
);

export default router;
