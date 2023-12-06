import mongoose from "mongoose";
import { host } from "../config/enviroment.js";

async function main() {
  await mongoose.connect(`mongodb://${host}:27017/getMarket`);

  console.log("Conectou ao Mongoose!");
}

main().catch((err) => console.log(err));

export default mongoose;
