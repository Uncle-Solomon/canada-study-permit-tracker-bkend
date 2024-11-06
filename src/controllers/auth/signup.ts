import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { User } from "../../models/User";
import { hashfunction } from "../../helpers/hash";
import validator from "validator";
import { badRequestError, internalServerError } from "../../utils/error";
import { generateSecretKey } from "../../helpers/generateSecretKey";
import { sendEmail } from "../../services/emailService";

export const signup = async (req: Request, res: Response) => {
  try {
    let { email, username, password } = req.body;
    console.log(req.body);
    let verified = false;
    const secretKey = generateSecretKey(username, email);

    if (
      !email ||
      !password ||
      !username ||
      !validator.isEmail(email) ||
      password.length < 6
    ) {
      throw badRequestError(
        "Please enter all required fields and a valid email address"
      );
    }

    if (username === password) {
      throw badRequestError("Username and Password cannot be the same");
    }

    let userExists = await User.findOne({ email });

    if (userExists) {
      throw badRequestError("This user already exists");
    }

    userExists = await User.findOne({ username });

    if (userExists) {
      throw badRequestError("This user already exists");
    }

    const user = new User({ email, username, password, secretKey, verified });
    user.password = await hashfunction(user.password);
    user.email = await hashfunction(user.email);
    let email_sent = await sendEmail(username, email, secretKey);

    if (!email_sent) {
      throw internalServerError("User signup was unsuccessful");
    }

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
