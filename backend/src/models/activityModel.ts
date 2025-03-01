import mongoose from "mongoose";
import { Users } from "./userModel";

const activitySchema:any = new mongoose.Schema({
    activity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(Date.now())
    },
    status: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: Users
    }
});

const Activities = mongoose.model("activities", activitySchema);

export { Activities };