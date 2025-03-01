import axios from "axios";
import { URL } from "../utils/backendUrl";

async function login(loginData: any){
    try {
        await axios.post(`${URL}/login`, { loginData }, { withCredentials: true });

        return true;
    }
    catch (error){
        if (error && typeof error === "object"){
            if ("response" in error && error.response && typeof error.response === "object"){
                if ("data" in error.response && error.response.data && typeof error.response.data === "object") {
                    if ("message" in error.response.data && typeof error.response.data.message === "string"){
                        if (error.response.data.message === "Invalid Credentials."){
                            return "Invalid Credentials.";
                        }
                    }
                }
            }
        }
        return false;
    }
}

async function signup(signupData: any){
    try {
        await axios.post(`${URL}/signup`, { signupData });

        return true;
    }
    catch (error){
        if (error && typeof error === "object"){
            if ("response" in error && error.response && typeof error.response === "object"){
                if ("data" in error.response && error.response.data && typeof error.response.data === "object") {
                    if ("message" in error.response.data && typeof error.response.data.message === "string"){
                        if (error.response.data.message === "Email already exists."){
                            return "Email already exists.";
                        }
                        else if (error.response.data.message === "Phone Number already exists."){
                            return "Phone Number already exists.";
                        }
                    }
                }
            }
        }
        return false;
    }
}

async function logout() {
    try {
        await axios.delete(`${URL}/logout`, { withCredentials: true });
        return true;
    }
    catch (error) {
        return false;
    }
}

async function getAccountDetails(): Promise<object|null> {
    try {
        const { data } = await axios.get(`${URL}/get-user-details`, { withCredentials: true });

        return data;
    }
    catch (error) {
        return null;
    }
}

export { login, signup, logout, getAccountDetails };