import { Request } from "express";
import { Types } from "mongoose";

export interface CustomRequest extends Request {
  user?: any;
}

export interface UserType {
  email: string;
  username: string;
  password: string;
  secretKey: string;
  verified: boolean;
}

export interface JWTPayload {
  user: {
    _id: Types.ObjectId;
    username: string;
  };
}

export interface CaseType {
  username: string;
  application_date: Date;
  application_status?: string;
  biometric_status?: string;
  biometric_date: Date;
  medical_status?: string;
  medical_date: Date;
  elegibility_status?: string;
  elegibility_date: Date;
  background_check_status?: string;
  background_check_date: Date;
  ppr_request?: string;
}
