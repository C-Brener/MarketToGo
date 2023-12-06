import mongoose from "../db/conn.js";
import { Schema } from "mongoose";

const Supermarket = mongoose.model(
  "Supermarket",
  new Schema(
    {
      name: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      register:
      {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  )
);

export default Supermarket;