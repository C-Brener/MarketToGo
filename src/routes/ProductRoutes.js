import express from "express";
import ProductController from "../controllers/ProductController.js";

const ProductRoutes = express.Router();

ProductRoutes.post("/register", ProductController.register);
ProductRoutes.put("/update/:id", ProductController.update);
ProductRoutes.get("/find/:id", ProductController.findById);
ProductRoutes.get("/find", ProductController.findAll);
ProductRoutes.delete("/delete/:id", ProductController.deleteProduct)

export default ProductRoutes;