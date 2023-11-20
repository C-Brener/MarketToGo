import mongoose from "../db/conn.js";
import { Schema } from "mongoose";
import Supermarket from "./Supermerket.js";

const Product = mongoose.model(
  "Product",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      finished_date: {
        type: String,
        required: true,
      },
      market: {
        type: String,
        required: true
      },
    },
    { timestamps: true }
  )
);

export default Product;