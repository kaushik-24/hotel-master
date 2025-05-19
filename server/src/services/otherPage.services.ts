import OtherPage from "../models/otherPage.model";
import HttpException from "../utils/HttpException.utils";

class OtherPageService {

    async getAllPages() {
        try {
            const pages = await OtherPage.find(); // Fetch all pages
            return pages;
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async getPageById(id: string) {
        try {
            const page = await OtherPage.findById(id); // Find page by ID
            if (!page) {
                throw HttpException.notFound("Page not found");
            }
            return page.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async createPage(data: { name: string, slug: string }) {
        try {
            const existingPage = await OtherPage.findOne({ $or: [{ name: data.name }, { slug: data.slug }] });

            if (existingPage) {
                throw HttpException.badRequest("Page name or slug already exists");
            }

            const newPage = await OtherPage.create(data);
            return newPage.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async editPage(id: string, data: { name?: string, slug?: string }) {
        try {
            const updatedPage = await OtherPage.findByIdAndUpdate(id, data, { new: true });
            if (!updatedPage) {
                throw HttpException.notFound("Page not found");
            }
            return updatedPage.toObject();
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async deletePage(id: string) {
        try {
            const deletedPage = await OtherPage.findByIdAndDelete(id);
            if (!deletedPage) {
                throw HttpException.notFound("Page not found");
            }
            return { message: "Page deleted successfully" };
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }
}

export default new OtherPageService();
