import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router";
import cookieParser from "cookie-parser";
import { connection } from "./db/connection";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://todo-pro-puce.vercel.app",
    credentials: true
}))

app.use(router);

connection();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server has started at PORT ${PORT}`);
})