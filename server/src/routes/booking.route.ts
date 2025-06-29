import { Router } from "express";
import BookingController from "../controllers/booking.controller";
import { CreateBookingDTO, UpdateBookingDTO } from "../dto/booking.dto";
import RequestValidator from "../middleware/Request.Validator";
import { catchAsync } from "../utils/CatchAsync.utils";
import { isAuthenticated } from "../middleware/auth.middleware";
import rateLimit from "express-rate-limit";
import multer from 'multer';
import path from 'path';

const bookingController = new BookingController();
const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (jpeg, jpg, png) are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit to 10 requests per IP
});

router.post(
    '/',
    upload.single('idImage'),
    catchAsync(bookingController.createBooking)
);

router.put(
    '/:bookingId',
    upload.single('idImage'),
    catchAsync(bookingController.updateBooking)
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

router.delete(
    '/:bookingId/image',
    catchAsync(bookingController.deleteBookingImage)
);

export default router;
