import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/jwtPayload';

class WebTokenService {
    sign(payload: JwtPayload): string {
        return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    }

    verify(token: string): JwtPayload {
        return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    }
}

export default new WebTokenService();