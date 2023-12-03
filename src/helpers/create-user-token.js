import Jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/constants.js";

const createUserToken = async (user, req, res) => {
  const token = Jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    SECRET_KEY
  );

  res.status(200).json({
    message: "You are Autenticated",
    token: token,
    userId: user.id,
  });
};

export default createUserToken;
