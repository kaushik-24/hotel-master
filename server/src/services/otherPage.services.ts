import path from "path";
import Page from "../models/otherPage.model"; // The Room model
import HttpException from "../utils/HttpException.utils";
import fs from "fs";

class PageService {

    /**
     * Create a new room.
     * @param data Room creation data (name, slug).
     * @returns Created room without sensitive data.
     */
    async getAllPages() {
        try {
            const pages = await Page.find();  // Fetch all rooms from the database
            return pages;
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getPageById(id: string) {
        try {
            const page = await Page.findById(id);  // Find room by ID in the database
            if (!page) {
                throw HttpException.notFound("Page not found");
            }
            return page.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async createPage(data: { name: string,  shortdesc: string,  heading: string, longdesc: string }, file?: Express.Multer.File) {
        try {
            
            const slug = data.name.toLowerCase()                 
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters                 
                .replace(/\s+/g, '-') // Replace spaces with hyphens                 
                .trim();  
            const existingPage = await Page.findOne({ $or: [{ name: data.name },{ slug: slug},  {shortdesc: data.shortdesc} ] });

            if (existingPage) {
                throw HttpException.badRequest("Page name or slug already exists");
            }
            const newPage = await Page.create({...data, slug: slug, pageImage: file ? `/uploads/${file.filename}` : undefined,});
            return newPage.toObject();
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
    async editPage(id: string, data: { name?: string,  shortdesc?: string,  heading?: string, longdesc?: string  }, file?: Express.Multer.File) {
        try {

    const existingPage = await Page.findById(id);
        if (!existingPage) {
            throw HttpException.notFound("Page not found");
        }
                 // Prepare update data
    const updateData: any = { ...data };

   
    // Handle image upload
    if (file) {
      // Delete the old image first
            if (existingPage.pageImage) {
                const oldImagePath = path.join(__dirname, "../../", existingPage.pageImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

      updateData.pageImage = `/uploads/${file.filename}`;
    }

    // Update slug if name is provided
    if (data.name) {
      updateData.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    }

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

    const updatedPage = await Page.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPage) {
      throw HttpException.notFound("Page not found");
    }

    return updatedPage.toObject();  
            } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getPageBySlug(slug: string) {
    try {
        const page = await Page.findOne({ slug });
        if (!page) {
            throw HttpException.notFound("Page not found");
        }
        return page.toObject();
    } catch (error: any) {
        throw HttpException.badRequest(error.message);
    }
}


    /**
     * Delete a room by its ID.
     * @param id Room ID.
     * @returns Success message.
     */
    async deletePage(id: string) {
        try {
            const page = await Page.findById(id);
            if (!page) {
                throw HttpException.notFound("Page not found");
            }
            
             // Remove the image if it exists
            if (page.pageImage) {
              const imagePath = path.join(__dirname, "../../", page.pageImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                }
            }
            await Page.findByIdAndDelete(id);
            return { message: "Page deleted successfully" };
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new PageService();

