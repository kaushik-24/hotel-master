import { ROLE } from "../constant/enum";
import { passwordRegex } from "../constant/regex"; // <--- Import your regex here
import User from "../models/auth.model";
import HttpException from "../utils/HttpException.utils";
import BcryptService from "./bcrypt.services";
import webTokenService from "./webToken.service";

class AuthService {

    constructor(
        private readonly bcryptService = new BcryptService(),
        private readonly webTokenGenerate = webTokenService,
    ) { }

    async createUser(data: {
        role: ROLE; name: string; email: string; password: string; phoneNumber: string
    }) {
        try {
            if (data.role === ROLE.ADMIN) {
                throw HttpException.badRequest('Admin creation not authorized');
            }

            // Use imported passwordRegex for validation
            if (!passwordRegex.test(data.password)) {
                throw HttpException.badRequest('Password must contain one uppercase letter, one digit, and be at least 8 characters long');
            }

            const hash = await this.bcryptService.hash(data.password);
            data.password = hash;

            const userResponse = await User.create(data);
            const { password, ...rest } = userResponse.toObject();
            return rest;
        } catch (error: any) {
            throw HttpException.badRequest(error.message);
        }
    }

    async loginUser(data: { email: string; password: string }) {
        try {
            const user = await User.findOne({ email: data.email });

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
            throw HttpException.unauthorized("Invalid Credentials");
        } catch (error: any) {
            throw HttpException.badRequest(error?.message);
        }
    }
}

export default new AuthService();
