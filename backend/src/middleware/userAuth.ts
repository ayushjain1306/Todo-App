import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET_KEY || "";

interface CustomRequest extends Request {
    email: any
}

async function userAuth(request: CustomRequest, response: Response, next: NextFunction): Promise<Response|undefined> {
    try {
        const token: string = request.cookies.token;

        if (token) {
            try {
                const decodedResult = jwt.verify(token, JWT_SECRET);

                if (decodedResult && typeof decodedResult === 'object' && "email" in decodedResult){
                    request.email = decodedResult.email;
                    next();
                }
            }
            catch (error) {
                return response.status(403).json({ message: "Unauthorized token." });
            }
        }
        else {
            return response.status(404).json({ message: "Token Not Found." });
        }
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            return response.status(500).json({message: error.message});
    }
}

export { userAuth };