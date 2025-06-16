import AboutUs from "../models/homeAboutUs.model";
import HttpException from "../utils/HttpException.utils";

class HomeAboutUsService {
  async getAboutUs() {
    try {
      const aboutUs = await AboutUs.findOne();
      if (!aboutUs) {
        throw HttpException.notFound("About Us section not found");
      }
      return aboutUs.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createAboutUs(data: { subtitle: string; title: string; description1: string; description2: string; description3: string }) {
    try {
      // Check if About Us section already exists
      const existingAboutUs = await AboutUs.findOne();
      if (existingAboutUs) {
        throw HttpException.badRequest("About Us section already exists. Please use update instead.");
      }

      const newAboutUs = await AboutUs.create(data);
      return newAboutUs.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async updateAboutUs(data: { subtitle?: string; title?: string; description1?: string; description2?: string; description3?: string }) {
    try {
      const existingAboutUs = await AboutUs.findOne();
      if (!existingAboutUs) {
        throw HttpException.notFound("About Us section not found");
      }

      const updateData: any = { ...data };

      // Remove undefined fields
      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedAboutUs = await AboutUs.findOneAndUpdate({}, updateData, { new: true });
      return updatedAboutUs?.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new HomeAboutUsService();
