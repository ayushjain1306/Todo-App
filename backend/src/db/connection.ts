import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL:string = process.env.MONGODB_URL || "";

async function connection() {
    try {
        await mongoose.connect(URL);

        console.log("Database connected successfully.");
    }
    catch (error) {
        console.log("Failed to connect Database.");
    }
}

export { connection };