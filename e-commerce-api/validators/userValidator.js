import { check } from "express-validator";
import bcrypt from "bcrypt";
import validate from "../middleware/validate.js";
import User from "../models/User.js";

export const registerValidator = [
  check("name")
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

export const updateUserValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("name must be at least 3 characters"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Email must be valid")
    .custom(async (val, { req }) => {
      const user = await User.findOne({ email: val });
      if (user && String(user._id) != req.params.id)
        return Promise.reject("E-mail already in use");
    }),

  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("password length must be more then 5"),

  validate,
];

export const updateUserPasswordValidator = [
  check("id").isMongoId().withMessage("user not found"),

  check("oldPassword")
    .notEmpty()
    .withMessage("Old Password is required")
    .custom(async (val, { req }) => {
      const user = await User.findById(req.params.id);
      if (!user) return Promise.reject("user not found");

      const res = await bcrypt.compare(val, user.password);

      if (!res) return Promise.reject("password not correct");
    }),

  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("password length must be more then 5"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Password confirmation does not match password");
    }

    return true;
  }),

  validate,
];
