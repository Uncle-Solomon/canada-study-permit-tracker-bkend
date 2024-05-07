import mongoose from "mongoose";
import { UserType } from "../utils/types";

export const userSchema = new mongoose.Schema<UserType>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "cspt.users",
  }
);

export const User = mongoose.model("User", userSchema);
