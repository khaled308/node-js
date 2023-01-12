const { check } = require("express-validator");
const { validate } = require("../middleware/validate");
const User = require("../models/User");

exports.registerValidateMiddleware = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("name must be at least 2 character"),

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

exports.loginValidator = [
  check("email").isEmail().withMessage("Email must be valid"),

  validate,
];
