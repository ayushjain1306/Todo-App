import { Users } from "../models/userModel";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const JWT_SECRET_KEY:string = process.env.JWT_SECRET_KEY || "";

function generateToken(email: string): string {
    return jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: '1h' });
}

interface CustomRequest extends Request {
    email: string
}

async function login(request: Request, response: Response): Promise<Response|undefined> {
    try {
        const { loginData } = request.body;

        if (!loginData) {
            return response.status(404).json({message: "Login Details Not Found."});
        }

        const verify: object|null = await Users.findOne({ email: loginData.email, password: loginData.password });

        if (!verify) {
            return response.status(404).json({message: "Invalid Credentials."});
        }

        const token: string = generateToken(loginData.email);

        response.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        return response.status(200).json({message: "Login Successful."});
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            return response.status(500).json({message: error.message});
    }
}

async function signup(request: Request, response: Response): Promise<Response|undefined> {
    try {
        const { signupData } = request.body;

        if (!signupData) {
            return response.status(404).json({message: "Signup Details Not Found."});
        }

        const { email, phone } = signupData;

        const verify: object|null = await Users.findOne({
            $or: [
                { email }, { phone }
            ]
        })

        if (verify && typeof verify === "object" && "email" in verify) {
            if (verify.email === email) {
                return response.status(409).json({message: "Email already exists."});
            }
            else {
                return response.status(409).json({message: "Phone Number already exists."});
            }
        }

        await Users.create({...signupData});

        return response.status(200).json({message: "Signup Successful."});
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            return response.status(500).json({message: error.message});
    }
}

async function logout(request: Request, response: Response): Promise<Response|undefined> {
    try {
        response.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        return response.status(200).json({message: "Logout Successful."});
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            return response.status(500).json({message: error.message});
    }
}

async function getUserDetails(request: CustomRequest, response: Response): Promise<Response|undefined> {
    try {
        const email = request.email;

        const result: object|null = await Users.findOne({email});

        return response.status(200).json(result);
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            return response.status(500).json({message: error.message});
    }
}

export { login, signup, logout, getUserDetails }