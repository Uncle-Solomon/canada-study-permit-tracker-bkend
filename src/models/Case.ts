import mongoose from "mongoose";
import { CaseType } from "../utils/types";

export const caseSchema = new mongoose.Schema<CaseType>(
  {
    username: {
      type: String,
      required: true,
    },
    application_date: {
      type: Date,
      required: true,
    },
    application_status: {
      type: String,
      required: true,
      default: "Pending",
    },
    biometric_status: {
      type: String,
    },
    biometric_date: {
      type: Date,
    },
    medical_status: {
      type: String,
    },
    medical_date: {
      type: Date,
    },
    elegibility_status: {
      type: String,
    },
    elegibility_date: {
      type: Date,
    },
    background_check_status: {
      type: String,
    },
    background_check_date: {
      type: Date,
    },
    ppr_request: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "cspt.cases",
  }
);

export const Case = mongoose.model("Case", caseSchema);
