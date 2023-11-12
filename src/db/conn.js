import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://0.0.0.0:27017/getMarket");

  console.log("Conectou ao Mongoose!");
}

main().catch((err) => console.log(err));

export default mongoose;
