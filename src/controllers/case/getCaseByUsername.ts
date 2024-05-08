import { Request, Response } from "express";
import { badRequestError, notFoundError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { Case } from "../../models/Case";

export const getCaseByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params; // Extract username from URL parameter

    // Basic validation (can be extended)
    if (!username) {
      throw badRequestError("Please provide username in the URL parameter");
    }

    const foundCase = await Case.findOne({ username });

    if (!foundCase) {
      throw notFoundError("Case not found");
    }

    res
      .status(StatusCodes.OK)
      .json(successResponse("Case found successfully", foundCase));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
