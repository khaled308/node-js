const bcrypt = require("bcrypt");
const asyncErrorHandler = require("express-async-handler");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const { signToken } = require("../utils/signToken");

exports.register = asyncErrorHandler(async (req, res) => {
  const user = await User.create(req.body);

  const token = signToken(user._id);
  const { password: p, ...data } = user._doc;

  return res.status(200).json({ ...data, token });
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  let passwordCorrect;

  if (user) passwordCorrect = await bcrypt.compare(password, user.password);

  if (!user || !passwordCorrect) {
    const error = new AppError("email or password not correct");
    return next(error);
  }

  const token = signToken(user._id);
  const { password: p, ...data } = user._doc;

  return res.status(200).json({ ...data, token });
});

exports.forgetPassword = asyncErrorHandler(async (req, res, next) => {});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {});

exports.emailVerificationToken = asyncErrorHandler(
  async (req, res, next) => {}
);

exports.verifyEmail = asyncErrorHandler(async (req, res, next) => {});
