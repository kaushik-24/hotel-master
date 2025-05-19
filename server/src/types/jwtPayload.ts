import { ROLE } from '../constant/enum'; // Adjust path as needed

export interface JwtPayload {
    id?: string;
    email: string;

    role?: ROLE;
}