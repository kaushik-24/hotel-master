import express from 'express';
import ReviewController from '../controllers/review.controller'; // Adjust path if needed (e.g., './controllers/ReviewController')

const router = express.Router();
const reviewController = new ReviewController();

// Routes for reviews
router.get('', reviewController.getReviews.bind(reviewController));
router.post('', reviewController.createReview.bind(reviewController));

export default router;
