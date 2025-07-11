import { Request, Response } from 'express';
import { StatusCodes } from "../constant/statusCode";
import { Message } from "../constant/messages";
import Review from "../models/review.model";

class ReviewController {
  async getReviews(req: Request, res: Response) {
    try {
      const reviews = await Review.find().lean();
      console.log('Raw reviews from DB:', reviews); // Debug log

      const totalReviews = reviews.length;
      const rating = totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

      res.status(StatusCodes.SUCCESS || 200).json({
        status: true,
        data: {
          reviews,
          rating: Number(rating.toFixed(1)),
          totalReviews,
        },
        message: Message.fetched,
      });
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      res.status(StatusCodes.BAD_REQUEST || 400).json({
        status: false,
        message: error.message || 'Failed to fetch reviews',
      });
    }
  }

  async createReview(req: Request, res: Response) {
    try {
      const { author_name, rating, text } = req.body;

      // Validate input
      if (!author_name || !rating || !text) {
        return res.status(StatusCodes.BAD_REQUEST || 400).json({
          status: false,
          message: 'Missing required fields: author_name, rating, or text',
        });
      }
      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(StatusCodes.BAD_REQUEST || 400).json({
          status: false,
          message: 'Rating must be a number between 1 and 5',
        });
      }

      // Generate relative_time_description
      const relative_time_description = 'just now';

      const review = new Review({
        author_name,
        rating,
        text,
        relative_time_description,
      });

      await review.save();
      console.log('Saved review:', review); // Debug log

      res.status(StatusCodes.SUCCESS || 200).json({
        status: true,
        data: review,
        message: 'Review submitted successfully',
      });
    } catch (error: any) {
      console.error('Error saving review:', error);
      res.status(StatusCodes.BAD_REQUEST || 400).json({
        status: false,
        message: error.message || 'Failed to save review',
      });
    }
  }
}

export default ReviewController;
