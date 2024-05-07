import { Request } from "express";
import { Types } from "mongoose";

export interface CustomRequest extends Request {
  user?: any;
}

export interface UserType {
  email: string;
  username: string;
  password: string;
}

export interface JWTPayload {
  user: {
    _id: Types.ObjectId;
    username: string;
  };
}
