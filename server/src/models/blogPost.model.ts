import mongoose, { Schema } from 'mongoose';

export interface IBlogPost {
  slug: string;
  title: string;
  author: string;
  date: Date;
  content: string;
  image?: string;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost;
