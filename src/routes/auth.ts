import { adminRoute, createUser, getProfile, privateRoute, signInUser } from "@/controllers/auth";
import { IsAuth, isAdmin, newUserValidator } from "@/middleware/auth";
import { Router } from "express";

const authRouter = Router();


authRouter.post("/signup", newUserValidator, createUser)
authRouter.post("/signin", newUserValidator, signInUser)
authRouter.get("/private", IsAuth, privateRoute)
authRouter.get("/profile", IsAuth, getProfile)
authRouter.get("/admin",  IsAuth, isAdmin, adminRoute)


export default authRouter;