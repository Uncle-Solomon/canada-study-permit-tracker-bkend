import { Response } from "express";
import { badRequestError, internalServerError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { Case } from "../../models/Case";
import { CaseType, CustomRequest } from "../../utils/types";

export const createCase = async (req: CustomRequest, res: Response) => {
  try {
    const username = req.user.username;
    const caseData: CaseType = req.body;

    caseData.username = username;

    // Basic validation (can be extended)
    if (!username || !caseData.application_date) {
      throw badRequestError(
        "Please provide required fields: username and application_date"
      );
    }

    const newCase = new Case(caseData);
    const savedCase = await newCase.save();

    if (!savedCase) {
      throw internalServerError("Failed to create case");
    }

    res
      .status(StatusCodes.CREATED)
      .json(successResponse("Case created successfully", savedCase));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
