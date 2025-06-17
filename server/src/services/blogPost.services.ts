import path from "path";
import BlogPost from "../models/blogPost.model"; // The Room model
import HttpException from "../utils/HttpException.utils";
import fs from "fs";

class blogPostService {

    /**
     * Create a new room.
     * @param data Room creation data (name, slug).
     * @returns Created room without sensitive data.
     */
    async getAllBlogPosts() {
        try {
            const blogPosts = await BlogPost.find();  // Fetch all rooms from the database
            return blogPosts;
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getBlogPostById(id: string) {
        try {
            const blogPost = await BlogPost.findById(id);  // Find room by ID in the database
            if (!blogPost) {
                throw HttpException.notFound("Blog Posts not found");
            }
            return blogPost.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }


    async createBlogPost(data: { title: string, author: string, content: string, }, file?: Express.Multer.File) {
        try {
            const slug = data.title.toLowerCase()                 
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters                 
                .replace(/\s+/g, '-') // Replace spaces with hyphens                 
                .trim();  
            const existingBlogPost = await BlogPost.findOne({ $or: [{ title: data.title },{ slug: slug}, { author: data.author }, {content: data.content} ] });

            if (existingBlogPost) {
                throw HttpException.badRequest("Room name or slug already exists");
            }
            const newBlogPost = await BlogPost.create({...data, slug: slug,
            image: file ? `/uploads/${file.filename}` : undefined,});
            return newBlogPost.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    /**
     * Edit an existing room by ID.
     * @param id Room ID.
     * @param data Updated room data.
     * @returns Updated room data.
     */
    async editBlogPost(id: string, data: { title?: string, author?: string, content?: string, }, file?: Express.Multer.File) {
        try {

    const existingBlogPost = await BlogPost.findById(id);
        if (!existingBlogPost) {
            throw HttpException.notFound("Blog post not found");
        }
                 // Prepare update data
    const updateData: any = { ...data };

    // Handle image upload
    if (file) {
      // Delete the old image first
            if (existingBlogPost.image) {
                const oldImagePath = path.join(__dirname, "../../", existingBlogPost.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

      updateData.image = `/uploads/${file.filename}`;
    }

    // Update slug if name is provided
    if (data.title) {
      updateData.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    }

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBlogPost) {
      throw HttpException.notFound("Blog post not found");
    }

    return updatedBlogPost.toObject();  
            } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getBlogPostBySlug(slug: string) {
    try {
        const blogPost = await BlogPost.findOne({ slug });
        if (!blogPost) {
            throw HttpException.notFound("Blog Post not found");
        }
        return blogPost.toObject();
    } catch (error: any) {
        throw HttpException.badRequest(error.message);
    }
}


    /**
     * Delete a room by its ID.
     * @param id Room ID.
     * @returns Success message.
     */
    async deleteBlogPost(id: string) {
        try {
            const blogPost = await BlogPost.findById(id);
            if (!blogPost) {
                throw HttpException.notFound("Blog post not found");
            }
            
             // Remove the image if it exists
            if (blogPost.image) {
              const imagePath = path.join(__dirname, "../../", blogPost.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                }
            }
            await BlogPost.findByIdAndDelete(id);
            return { message: "Blog post deleted successfully" };
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new blogPostService();

