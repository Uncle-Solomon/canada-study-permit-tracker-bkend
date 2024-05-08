import { Request, Response } from "express";
import { badRequestError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { User } from "../../models/User";

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { username, secretKey } = req.body;

    if (!username || !secretKey) {
      throw badRequestError("Please enter all required fields");
    }

    const user = await User.findOneAndUpdate(
      { username, secretKey },
      { verified: true, secretKey: "" },
      { new: true } // Return the updated document
    );

    if (!user) {
      throw badRequestError("Invalid username or secret key");
    }

    res
      .status(StatusCodes.OK)
      .json(successResponse("Email verified successfully"));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
