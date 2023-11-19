import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRouRouts from "./routes/ProductRoutes.js"
import SupermarketRoutes from "./routes/SupermarketRoutes.js";

const app = express();

//Express
app.use(express.json());

//Cors
app.use(cors({ credentials: true, origin: "http://localhost:5000"}));

//Public Images
app.use(express.static("public"));

//Routes
app.use("/users", UserRoutes);
app.use("/products", ProductRouRouts);
app.use("/supermarket", SupermarketRoutes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
