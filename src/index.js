import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";

const app = express();

//Express
app.use(express.json());

//Cors
app.use(cors({ credentials: true, origin: "http://localhost:5000"}));

//Public Images
app.use(express.static("public"));

//Routes
app.use("/users", UserRoutes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
