import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import SupermarketRoutes from "./routes/SupermarketRoutes.js";
import { host } from "./config/enviroment.js";

const app = express();

//Express
app.use(express.json());

//Cors
app.use(cors({ credentials: true, origin: `http://${host}:5000` }));

//Public Images
app.use(express.static("public"));

//Routes
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/supermarket", SupermarketRoutes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
