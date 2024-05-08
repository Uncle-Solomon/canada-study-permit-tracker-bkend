import { Response } from "express";
import { badRequestError, internalServerError } from "../../utils/error";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../utils/customResponse";
import { Case } from "../../models/Case";
import { CaseType, CustomRequest } from "../../utils/types";

export const editCase = async (req: CustomRequest, res: Response) => {
  try {
    const username = req.user.username;
    const caseData: Partial<CaseType> = req.body; // Allow partial updates

    // Basic validation (can be extended)
    if (!username) {
      throw badRequestError("Please provide username in the URL parameter");
    }

    const existingCase = await Case.findOne({ username });

    if (!existingCase) {
      throw badRequestError("Case not found");
    }

    // Update relevant fields (avoid overwriting everything)
    existingCase.set(caseData);

    const updatedCase = await existingCase.save();

    if (!updatedCase) {
      throw internalServerError("Failed to update case");
    }

    res
      .status(StatusCodes.OK)
      .json(successResponse("Case updated successfully", updatedCase));
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message));
  }
};
