import express from "express";

const userRouter = express.Router();
import {getUsers, createUser,getUserById} from '../controllers/userController.js';

userRouter.get("/users", getUsers);
userRouter.post("/users", createUser);
userRouter.get("/users/:id", getUserById);

export default userRouter;