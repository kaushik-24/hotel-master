"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../constant/enum");
const regex_1 = require("../constant/regex"); // <--- Import your regex here
const auth_model_1 = __importDefault(require("../models/auth.model"));
const HttpException_utils_1 = __importDefault(require("../utils/HttpException.utils"));
const bcrypt_services_1 = __importDefault(require("./bcrypt.services"));
const webToken_service_1 = __importDefault(require("./webToken.service"));
class AuthService {
    constructor(bcryptService = new bcrypt_services_1.default(), webTokenGenerate = webToken_service_1.default) {
        this.bcryptService = bcryptService;
        this.webTokenGenerate = webTokenGenerate;
    }
    async createUser(data) {
        try {
            if (data.role === enum_1.ROLE.ADMIN) {
                throw HttpException_utils_1.default.badRequest('Admin creation not authorized');
            }
            // Use imported passwordRegex for validation
            if (!regex_1.passwordRegex.test(data.password)) {
                throw HttpException_utils_1.default.badRequest('Password must contain one uppercase letter, one digit, and be at least 8 characters long');
            }
            const hash = await this.bcryptService.hash(data.password);
            data.password = hash;
            const userResponse = await auth_model_1.default.create(data);
            const { password, ...rest } = userResponse.toObject();
            return rest;
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error.message);
        }
    }
    async loginUser(data) {
        try {
            const user = await auth_model_1.default.findOne({ email: data.email });
            if (user && await this.bcryptService.compare(data.password, user.password)) {
                const token = this.webTokenGenerate.sign({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                });
                const { password, _id, ...response } = user.toObject();
                return {
                    token: { accessToken: token },
                    role: user.role,
                    name: user.name
                };
            }
            throw HttpException_utils_1.default.unauthorized("Invalid Credentials");
        }
        catch (error) {
            throw HttpException_utils_1.default.badRequest(error?.message);
        }
    }
}
exports.default = new AuthService();
