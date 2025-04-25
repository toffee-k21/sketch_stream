import express, { Router } from "express";
import { signinHandler, signupHandler } from "../controllers/user";


const userRouter: Router = express.Router();

userRouter.post('/signup',signupHandler)
userRouter.post('/signin',signinHandler)

export default userRouter