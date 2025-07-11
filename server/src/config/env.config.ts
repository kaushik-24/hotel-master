export class DotenvConfig {
  static getEnv(env: any) {
    return {
      NODE_ENV: env.NODE_ENV || 'production',
      DATABASE_HOST: env.DATABASE_HOST,
      DB_NAME: env.DB_NAME || 'hoteldb',
      JWT_SECRET: env.JWT_SECRET,
      JWT_TOKEN_EXPIRE: env.JWT_TOKEN_EXPIRE,
      ADMIN_PASSWORD: env.ADMIN_PASSWORD,
      ADMIN_PATH: env.ADMIN_PATH,
      EMAIL_USER: env.EMAIL_USER,
      EMAIL_PASS: env.EMAIL_PASS,
      DEBUG_MODE: env.DEBUG_MODE,
      CORS_ORIGIN: env.CORS_ORIGIN?.split(',') || ['https://hotel-master.pages.dev/'],
      API_KEY: env.API_KEY,
    };
  }
}
