"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = __importDefault(require("../controllers/booking.controller"));
const CatchAsync_utils_1 = require("../utils/CatchAsync.utils");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const bookingController = new booking_controller_1.default();
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(new Error('Only images (jpeg, jpg, png) are allowed'));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit to 10 requests per IP
});
router.post('/', upload.single('idImage'), (0, CatchAsync_utils_1.catchAsync)(bookingController.createBooking));
router.put('/:bookingId', upload.single('idImage'), (0, CatchAsync_utils_1.catchAsync)(bookingController.updateBooking));
router.get('/', (0, CatchAsync_utils_1.catchAsync)(bookingController.getAllBookings));
router.get('/:bookingId', (0, CatchAsync_utils_1.catchAsync)(bookingController.getBookingById));
router.delete('/:bookingId', (0, CatchAsync_utils_1.catchAsync)(bookingController.deleteBooking));
router.delete('/:bookingId/image', (0, CatchAsync_utils_1.catchAsync)(bookingController.deleteBookingImage));
exports.default = router;
