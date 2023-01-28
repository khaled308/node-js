import { Router } from "express";
import { login, register } from "../controllers/userController.js";
import { registerValidator } from "../validators/userValidator.js";

const userRoutes = Router();

userRoutes.post("/register", registerValidator, register);
userRoutes.post("/login", login);

export default userRoutes;
