import { check } from "express-validator";
import validate from "../middleware/validate.js";
import User from "../models/User.js";

export const registerValidator = [
  check("fullName")
    .isLength({ min: 2 })
    .withMessage("name must be at least 3 characters"),

  check("email")
    .isEmail()
    .withMessage("Email must be valid")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) return Promise.reject("E-mail already in use");
    }),

  check("password")
    .isLength({ min: 6 })
    .withMessage("password length must be more then 5"),

  validate,
];
