import express from "express";
import UserController from "../controllers/UserController.js";

const UserRoutes = express.Router();

UserRoutes.post("/register", UserController.register);

export default UserRoutes;
