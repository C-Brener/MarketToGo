import Jwt from "jsonwebtoken";
import User from "../models/User.js";
import { SECRET_KEY } from "../config/constants.js";

const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const decoded = Jwt.verify(token, SECRET_KEY);
  const userId = decoded.id;
  const user = await User.findOne({ _id: userId });

  return user;
};

export default getUserByToken;
