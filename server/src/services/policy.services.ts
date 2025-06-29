import path from "path";
import Policy from "../models/policy.model";
import HttpException from "../utils/HttpException.utils";
import fs from "fs";

class PolicyService {
  async getAllPolicies() {
    try {
      const policies = await Policy.find();
      return policies;
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async getPolicyById(id: string) {
    try {
      const policy = await Policy.findById(id);
      if (!policy) {
        throw HttpException.notFound("Policy not found");
      }
      return policy.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async createPolicy(data: { title: string, author: string, content: string }, file?: Express.Multer.File) {
    try {
      const slug = data.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      const existingPolicy = await Policy.findOne({ $or: [{ title: data.title }, { slug: slug }, { author: data.author }, { content: data.content }] });

      if (existingPolicy) {
        throw HttpException.badRequest("Policy title or slug already exists");
      }
      const newPolicy = await Policy.create({
        ...data,
        slug: slug,
        image: file ? `/uploads/${file.filename}` : undefined,
      });
      return newPolicy.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async editPolicy(id: string, data: { title?: string, author?: string, content?: string }, file?: Express.Multer.File) {
    try {
      const existingPolicy = await Policy.findById(id);
      if (!existingPolicy) {
        throw HttpException.notFound("Policy not found");
      }

      const updateData: any = { ...data };

      if (file) {
        if (existingPolicy.image) {
          const oldImagePath = path.join(__dirname, "../../", existingPolicy.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.image = `/uploads/${file.filename}`;
      }

      if (data.title) {
        updateData.slug = data.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .trim();
      }

      Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

      const updatedPolicy = await Policy.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedPolicy) {
        throw HttpException.notFound("Policy not found");
      }

      return updatedPolicy.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async getPolicyBySlug(slug: string) {
    try {
      const policy = await Policy.findOne({ slug });
      if (!policy) {
        throw HttpException.notFound("Policy not found");
      }
      return policy.toObject();
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }

  async deletePolicy(id: string) {
    try {
      const policy = await Policy.findById(id);
      if (!policy) {
        throw HttpException.notFound("Policy not found");
      }

      if (policy.image) {
        const imagePath = path.join(__dirname, "../../", policy.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await Policy.findByIdAndDelete(id);
      return { message: "Policy deleted successfully" };
    } catch (error: any) {
      throw HttpException.badRequest(error.message);
    }
  }
}

export default new PolicyService();
