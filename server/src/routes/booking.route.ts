// src/routes/booking.route.ts
import { Router } from "express";
import BookingController from "../controllers/booking.controller";
import { CreateBookingDTO, SendBookingEmailDTO } from "../dto/booking.dto";
import RequestValidator from "../middleware/Request.Validator";
import { catchAsync } from "../utils/CatchAsync.utils";
import { isAuthenticated } from "../middleware/auth.middleware";
import rateLimit from "express-rate-limit";

const bookingController = new BookingController();
const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit to 10 requests per IP
});

router.post('/', limiter, RequestValidator.validate(CreateBookingDTO), catchAsync(bookingController.createBooking));

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
