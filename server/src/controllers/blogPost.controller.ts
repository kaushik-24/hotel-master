import { Request, Response } from 'express';
import { Message } from '../constant/messages';
import { StatusCodes } from '../constant/statusCode';
import blogPostService from '../services/blogPost.services';

class BlogPostController {
  async getBlogPosts(req: Request, res: Response) {
    try {
      const response = await blogPostService.getBlogPosts();
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || 'An error occurred while fetching blog posts.',
        originalError: error.message || 'An error occurred while fetching blog posts.',
      });
    }
  }

  async getBlogPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await blogPostService.getBlogPostById(id);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.fetched,
        data: response,
      });
    } catch (error: any) {
      console.error('Error fetching blog post:', error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || 'An error occurred while fetching the blog post.',
        originalError: error.message || 'An error occurred while fetching the blog post.',
      });
    }
  }

  async createBlogPost(req: Request, res: Response) {
    try {
      const response = await blogPostService.createBlogPost(req.body, req.file);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: Message.created,
        data: response,
      });
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || 'An error occurred while creating the blog post.',
        originalError: error.message || 'An error occurred while creating the blog post.',
      });
    }
  }

  async updateBlogPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await blogPostService.updateBlogPost(id, req.body, req.file);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.updated,
        data: response,
      });
    } catch (error: any) {
      console.error('Error updating blog post:', error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || 'An error occurred while updating the blog post.',
        originalError: error.message || 'An error occurred while updating the blog post.',
      });
    }
  }

  async deleteBlogPost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await blogPostService.deleteBlogPost(id);
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: Message.deleted,
        data: response,
      });
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      res.status(error.statusCode || StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message || 'An error occurred while deleting the blog post.',
        originalError: error.message || 'An error occurred while deleting the blog post.',
      });
    }
  }
}

export default new BlogPostController();
