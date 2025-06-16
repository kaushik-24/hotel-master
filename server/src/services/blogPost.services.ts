import path from 'path';
import fs from 'fs';
import BlogPost, { IBlogPost } from '../models/blogPost.model';
import HttpException from '../utils/HttpException.utils';

class BlogPostService {
  async getBlogPosts() {
    try {
      const posts = await BlogPost.find();
      return posts.map(post => post.toObject());
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async getBlogPostById(id: string) {
    try {
      const post = await BlogPost.findById(id);
      if (!post) {
        throw HttpException.notFound('Blog post not found');
      }
      return post.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createBlogPost(data: { title: string; author: string; content: string }, file?: Express.Multer.File) {
    try {
      const postData: Partial<IBlogPost> = {
        ...data,
        image: file ? `/uploads/${file.filename}` : undefined,
      };

      const newPost = await BlogPost.create(postData);
      return newPost.toObject();
    } catch (error: any) {
      if (file) {
        const filePath = path.join(__dirname, '../../uploads', file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw HttpException.badRequest(error.message);
    }
  }

  async updateBlogPost(id: string, data: { title?: string; author?: string; content?: string }, file?: Express.Multer.File) {
    try {
      const existingPost = await BlogPost.findById(id);
      if (!existingPost) {
        throw HttpException.notFound('Blog post not found');
      }

      const updateData: Partial<IBlogPost> = { ...data };

      if (file) {
        if (existingPost.image) {
          const oldImagePath = path.join(__dirname, '../../', existingPost.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.image = `/uploads/${file.filename}`;
      }

      Object.keys(updateData).forEach(key => updateData[key as keyof IBlogPost] === undefined && delete updateData[key as keyof IBlogPost]);

      const updatedPost = await BlogPost.findByIdAndUpdate(id, updateData, { new: true });
      return updatedPost?.toObject();
    } catch (error: any) {
      if (file) {
        const filePath = path.join(__dirname, '../../Uploads', file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      throw HttpException.badRequest(error.message);
    }
  }

  async deleteBlogPost(id: string) {
    try {
      const post = await BlogPost.findById(id);
      if (!post) {
        throw HttpException.notFound('Blog post not found');
      }

      if (post.image) {
        const imagePath = path.join(__dirname, '../../', post.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await BlogPost.findByIdAndDelete(id);
      return { message: 'Blog post deleted successfully' };
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new BlogPostService();
