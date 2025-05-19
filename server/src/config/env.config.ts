import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export class DotenvConfig {
    static NODE_ENV = process.env.NODE_ENV;
    static PORT = +process.env.PORT!;

    // *Database Configurations
    static DATABASE_HOST = process.env.DATABASE_HOST;

    // JWT SECRET
    static JWT_SECRET = process.env.JWT_SECRET;
    static JWT_TOKEN_EXPIRE = process.env.JWT_TOKEN_EXPIRE;

    //ADMIN SEED PASSWORD
    static ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

    // DEBUG_MODE
    static DEBUG_MODE = process.env.DEBUG_MODE;

    // CORS LIST
    static CORS_ORIGIN = process.env.CORS_ORIGIN?.split(",") || [];
    static API_KEY = process.env.API_KEY;
}
