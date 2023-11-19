import express from "express";
import SupermarketController from "../controllers/SupermarketController.js";

const SupermarketRoutes = express.Router();

SupermarketRoutes.post("/register", SupermarketController.register);
SupermarketRoutes.put("/update/:id", SupermarketController.update);
SupermarketRoutes.get("/find/:id", SupermarketController.findById);
SupermarketRoutes.get("/find", SupermarketController.findAll);
SupermarketRoutes.delete("/delete/:id", SupermarketController.deleteSupermarket)

export default SupermarketRoutes;