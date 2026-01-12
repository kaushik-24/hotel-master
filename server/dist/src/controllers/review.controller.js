"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = require("../constant/statusCode");
const messages_1 = require("../constant/messages");
const review_model_1 = __importDefault(require("../models/review.model"));
class ReviewController {
    async getReviews(req, res) {
        try {
            const reviews = await review_model_1.default.find().lean();
            console.log('Raw reviews from DB:', reviews); // Debug log
            const totalReviews = reviews.length;
            const rating = totalReviews > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
                : 0;
            res.status(statusCode_1.StatusCodes.SUCCESS || 200).json({
                status: true,
                data: {
                    reviews,
                    rating: Number(rating.toFixed(1)),
                    totalReviews,
                },
                message: messages_1.Message.fetched,
            });
        }
        catch (error) {
            console.error('Error fetching reviews:', error);
            res.status(statusCode_1.StatusCodes.BAD_REQUEST || 400).json({
                status: false,
                message: error.message || 'Failed to fetch reviews',
            });
        }
    }
    async createReview(req, res) {
        try {
            const { author_name, rating, text } = req.body;
            // Validate input
            if (!author_name || !rating || !text) {
                return res.status(statusCode_1.StatusCodes.BAD_REQUEST || 400).json({
                    status: false,
                    message: 'Missing required fields: author_name, rating, or text',
                });
            }
            if (typeof rating !== 'number' || rating < 1 || rating > 5) {
                return res.status(statusCode_1.StatusCodes.BAD_REQUEST || 400).json({
                    status: false,
                    message: 'Rating must be a number between 1 and 5',
                });
            }
            // Generate relative_time_description
            const relative_time_description = 'just now';
            const review = new review_model_1.default({
                author_name,
                rating,
                text,
                relative_time_description,
            });
            await review.save();
            console.log('Saved review:', review); // Debug log
            res.status(statusCode_1.StatusCodes.SUCCESS || 200).json({
                status: true,
                data: review,
                message: 'Review submitted successfully',
            });
        }
        catch (error) {
            console.error('Error saving review:', error);
            res.status(statusCode_1.StatusCodes.BAD_REQUEST || 400).json({
                status: false,
                message: error.message || 'Failed to save review',
            });
        }
    }
}
exports.default = ReviewController;
