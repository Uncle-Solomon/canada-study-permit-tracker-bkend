import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { StatusCodes } from "http-status-codes";
import { badRequestError, notFoundError } from "../../utils/error";
// import { REFRESH_KEY, SECRET_KEY } from "../../utils/config";

import { createJwt } from "../../utils/jwt";
import { JWTPayload } from "../../utils/types";
import { SECRET_KEY } from "../../utils/config";
import { User } from "../../models/User";

export const login = async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      throw badRequestError("Please enter all required fields");
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw notFoundError("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw badRequestError("Password entered is incorrect");
    }
    let _id = user._id;

    let verified = user.verified;

    if (!verified) {
      throw badRequestError("User is unverified; please verify your email");
    }

    let payload: JWTPayload = { user: { _id, username } };
    let token: string = createJwt(payload, SECRET_KEY, 3600);

    res
      .status(StatusCodes.OK)
      .json(successResponse("User login successful", { token }));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
