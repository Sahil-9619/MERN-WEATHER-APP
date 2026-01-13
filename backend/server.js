import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js'

const app = express()

app.use(cors());
app.use(express.json());
dotenv.config();

//Routes
app.use("/api/weather",weatherRoutes);

//CALLING SERVER
const PORT = 5000;
app.listen(PORT,()=>{
    console.log("Server in running on PORT",PORT)
})