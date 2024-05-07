import { Request, Response } from "express";
import { badRequestError, internalServerError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { User } from "../../models/User";
import { hashfunction } from "../../helpers/hash";
import validator from "validator";

export const signup = async (req: Request, res: Response) => {
  try {
    let { email, username, password } = req.body;

    if (!email || !password || !username || !validator.isEmail(email)) {
      throw badRequestError(
        "Please enter all required fields and a valid email address"
      );
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw badRequestError("This user already exists");
    }

    const user = new User({ email, username, password });
    user.password = await hashfunction(user.password);
    user.email = await hashfunction(user.email);
    const response = await user.save();

    if (!response) {
      throw internalServerError("User signup was unsuccessful");
    }

    res
      .status(StatusCodes.CREATED)
      .json(successResponse("User created successfully"));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
