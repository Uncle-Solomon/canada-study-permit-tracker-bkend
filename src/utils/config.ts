import dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT);
export const MONGODB_URL: string = process.env.MONGODB_URL;
export const SECRET_KEY: string = process.env.SECRET_KEY;
export const REFRESH_KEY: string = process.env.REFRESH_KEY;
export const SERVICE_ID: string = process.env.SERVICE_ID;
export const TEMPLATE_ID: string = process.env.TEMPLATE_ID;
export const USER_ID: string = process.env.USER_ID;
