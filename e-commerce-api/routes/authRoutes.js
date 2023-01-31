import { Router } from "express";
import {
  forgetPassword,
  login,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { registerValidator } from "../validators/userValidator.js";

const authRoutes = Router();

authRoutes.post("/register", registerValidator, register);
authRoutes.post("/login", login);
authRoutes.post("/forget-password", forgetPassword);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
