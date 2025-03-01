import { Activities } from "../models/activityModel";
import { Users } from "../models/userModel";
import { Request, Response } from "express";

interface CustomRequest extends Request {
    email: any,
    activity: any
}

async function getActivities(request: CustomRequest, response: Response): Promise<Response|undefined> {
    try {
        const email = request.email;

        const user: object|null = await Users.findOne({email});

        if (user && typeof user === "object" && "_id" in user) {
            const activities: object[] = await Activities.find({ user_id: user._id }).sort({ date: 1 });

            return response.status(200).json(activities);
        }
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            return response.status(500).json({message: error.message});
    }
}

async function createActivity(request: CustomRequest, response: Response): Promise<Response|undefined> {
    try {
        const email = request.email;

        const user: object|null = await Users.findOne({email});

        const { activity } = request.body;

        if (user && typeof user === "object" && "_id" in user) {
            const newActivity = new Activities({
                ...activity, user_id: user._id
            });
    
            newActivity.save();
    
            return response.status(200).json({message: "Activity created successfully."});
        }
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            return response.status(500).json({message: error.message});
    }
}

async function updateActivity(request: Request, response: Response): Promise<Response|undefined> {
    try {
        const { id, activity } = request.body;

        await Activities.updateOne({ _id: id }, activity );

        return response.status(200).json({message: "Activity updated successfully."});
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            return response.status(500).json({message: error.message});
    }
}

async function deleteActivity(request: Request, response: Response): Promise<Response|undefined> {
    try {
        const { id } = request.headers;

        await Activities.deleteOne({ _id: id });

        return response.status(200).json({message: "Activity deleted successfully."});
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            return response.status(500).json({message: error.message});
    }
}

export { getActivities, createActivity, updateActivity, deleteActivity };