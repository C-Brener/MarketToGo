import express from "express";
import UserController from "../controllers/UserController.js";
import verifyToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js";

const UserRoutes = express.Router();

//Middleware -> This middleware is used for verify if the token passed by user is valid
const checkToken = verifyToken;

UserRoutes.post("/register", UserController.register);
UserRoutes.post("/login", UserController.login);
UserRoutes.get("/check-user", UserController.checkUser);
UserRoutes.get("/:id", UserController.getUserById);
UserRoutes.patch(
  "/edit/:id",
  checkToken,
  imageUpload.single("image"),
  UserController.editUser
);

export default UserRoutes;
