import express, { Request, Response } from "express";
import { userAuth } from "../middleware/userAuth";
import { login, signup, logout, getUserDetails } from "../controllers/accountController";
import { getActivities, createActivity, updateActivity, deleteActivity } from "../controllers/activityController";

const router:any = express.Router();

router.get('/', (request: Request, response:Response) => {
    response.json("Hello from Server");
})

router.post("/login", login);
router.post("/signup", signup);
router.delete("/logout", userAuth, logout);
router.get('/get-user-details', userAuth, getUserDetails);

router.get("/get-activities", userAuth, getActivities);
router.post("/create-activities", userAuth, createActivity);
router.put("/update-activities", userAuth, updateActivity);
router.delete("/delete-activities", userAuth, deleteActivity);

export default router;