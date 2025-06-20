// src/routes/booking.route.ts
import { Router } from "express";
import BookingController from "../controllers/booking.controller";
import { CreateBookingDTO, SendBookingEmailDTO } from "../dto/booking.dto";
import RequestValidator from "../middleware/Request.Validator";
import { catchAsync } from "../utils/CatchAsync.utils";
import { isAuthenticated } from "../middleware/auth.middleware";

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


// Send booking confirmation email
router.post(
  "/send-email",
  isAuthenticated,
  RequestValidator.validate(SendBookingEmailDTO),
  catchAsync(bookingController.sendBookingEmail)
);

export default router;
