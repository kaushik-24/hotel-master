import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export class DotenvConfig {
    static NODE_ENV = process.env.NODE_ENV;
    static PORT = Number(process.env.PORT) || 3000;

    // *Database Configurations
    static DATABASE_HOST = process.env.DATABASE_HOST;

    // JWT SECRET
    static JWT_SECRET = process.env.JWT_SECRET;
    static JWT_TOKEN_EXPIRE = process.env.JWT_TOKEN_EXPIRE;

    //ADMIN SEED PASSWORD
    static ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

    //add the custom admin path
    static ADMIN_PATH = process.env.ADMIN_PATH;
    
    static EMAIL_USER = process.env.EMAIL_USER;
    static EMAIL_PASS = process.env.EMAIL_PASS;

    // DEBUG_MODE
    static DEBUG_MODE = process.env.DEBUG_MODE;

    // CORS LIST
    static CORS_ORIGIN = process.env.CORS_ORIGIN?.split(",") || [];
    static API_KEY = process.env.API_KEY;
}
