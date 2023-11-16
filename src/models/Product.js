import mongoose from "../db/conn.js";
import { Schema } from "mongoose";

const Product = mongoose.model(
  "Product",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
      },
      finished_date: {
        type: String,
        required: true,
      },
      available: {
        type: Boolean,
      },
    },
    { timestamps: true }
  )
);

export default Product;
