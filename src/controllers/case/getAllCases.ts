import { Request, Response } from "express";
import { notFoundError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { Case } from "../../models/Case";

export const getAllCases = async (req: Request, res: Response) => {
  try {
    const cases = await Case.find({});

    if (!cases) {
      throw notFoundError("No cases found");
    }

    res
      .status(StatusCodes.OK)
      .json(successResponse("Cases retrieved successfully", cases));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
