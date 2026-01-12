"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = __importDefault(require("../controllers/review.controller")); // Adjust path if needed (e.g., './controllers/ReviewController')
const router = express_1.default.Router();
const reviewController = new review_controller_1.default();
// Routes for reviews
router.get('', reviewController.getReviews.bind(reviewController));
router.post('', reviewController.createReview.bind(reviewController));
exports.default = router;
