import { JwtPayload } from '../types/jwtPayload';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload; // Extend the Request interface
        }
    }
}