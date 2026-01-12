"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const policy_model_1 = __importDefault(require("../models/policy.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const fs_1 = __importDefault(require("fs"));
class PolicyService {
    async getAllPolicies() {
        try {
            const policies = await policy_model_1.default.find();
            return policies;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getPolicyById(id) {
        try {
            const policy = await policy_model_1.default.findById(id);
            if (!policy) {
                throw HttpException_utils_1.default.notFound("Policy not found");
            }
            return policy.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async createPolicy(data, file) {
        try {
            const slug = data.title.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim();
            const existingPolicy = await policy_model_1.default.findOne({ $or: [{ title: data.title }, { slug: slug }, { author: data.author }, { content: data.content }] });
            if (existingPolicy) {
                throw HttpException_utils_1.default.badRequest("Policy title or slug already exists");
            }
            const newPolicy = await policy_model_1.default.create({
                ...data,
                slug: slug,
                image: file ? `/uploads/${file.filename}` : undefined,
            });
            return newPolicy.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async editPolicy(id, data, file) {
        try {
            const existingPolicy = await policy_model_1.default.findById(id);
            if (!existingPolicy) {
                throw HttpException_utils_1.default.notFound("Policy not found");
            }
            const updateData = { ...data };
            if (file) {
                if (existingPolicy.image) {
                    const oldImagePath = path_1.default.join(__dirname, "../../", existingPolicy.image);
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
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
            const updatedPolicy = await policy_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedPolicy) {
                throw HttpException_utils_1.default.notFound("Policy not found");
            }
            return updatedPolicy.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async getPolicyBySlug(slug) {
        try {
            const policy = await policy_model_1.default.findOne({ slug });
            if (!policy) {
                throw HttpException_utils_1.default.notFound("Policy not found");
            }
            return policy.toObject();
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async deletePolicy(id) {
        try {
            const policy = await policy_model_1.default.findById(id);
            if (!policy) {
                throw HttpException_utils_1.default.notFound("Policy not found");
            }
            if (policy.image) {
                const imagePath = path_1.default.join(__dirname, "../../", policy.image);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            await policy_model_1.default.findByIdAndDelete(id);
            return { message: "Policy deleted successfully" };
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
}
exports.default = new PolicyService();
