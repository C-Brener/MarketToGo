import express from "express";
import cors from "cors";


const app = express()

//Express
app.use(express.json())

//Cors
app.use(cors({credentials:true, origin:"http://localhost:3000"}))

//Public Images
app.use(express.static('public'))


//Routes
app.listen(5000)