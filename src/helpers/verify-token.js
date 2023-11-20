import Jwt from "jsonwebtoken";
import getToken from "./get-token.js";

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unathorized" });
  }
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Unathorized" });
  }

  try {
    const verified = Jwt.verify(token, "oursecret");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

export default verifyToken;
