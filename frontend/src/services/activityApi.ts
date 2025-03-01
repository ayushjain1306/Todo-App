import axios from "axios";
import { URL } from "../utils/backendUrl";

async function getActivities() {
    try {
        const response: any = await axios.get(`${URL}/get-activities`, { withCredentials: true });

        if (response) {
            return response.data;
        }
    }
    catch (error) {
        return null;
    }
}

async function createActivity(activity: object) {
    try {
        await axios.post(`${URL}/create-activities`, { activity }, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function updateActivity(id: any, activity: object) {
    try {
        await axios.put(`${URL}/update-activities`, { id, activity }, { withCredentials: true });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function deleteActivity(id: any) {
    try {
        await axios.delete(`${URL}/delete-activities`, { 
            headers: { id },
            withCredentials: true 
        });

        return true;
    }
    catch (error) {
        return false;
    }
}

export { getActivities, createActivity, updateActivity, deleteActivity }