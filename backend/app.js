import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv"
import todoRoutes from "./routes/todos.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000
const MONGODB_URL = process.env.MONGODB_URL;



app.use(cookieParser())
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes)

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT:${PORT} and connected database`);
        });
    })
    .catch((error) => {
        console.log(error);
    })