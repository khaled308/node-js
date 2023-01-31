import User from "../models/User.js";
import { compare } from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import { signToken } from "../utils/token.js";
import sendMail from "../utils/sendMail.js";

const register = expressAsyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const token = signToken(user._id);
  const { password: p, ...data } = user._doc;

  res.send({ ...data, token });
});

const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  let passwordCorrect;

  if (user) passwordCorrect = await compare(password, user.password);

  if (!user || !passwordCorrect) {
    const error = new AppError("email or password not correct", 404);
    return next(error);
  }
  const token = signToken(user._id);
  const { password: p, ...data } = user._doc;
  res.send({ ...data, token });
});

const forgetPassword = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new AppError(404, "User Not Found"));

  const token = user.createPasswordResetToken();
  sendMail(
    user.email,
    "reset Password",
    `<a href=http://localhost/${token}>Reset Password</a>`
  );
  await user.save();

  res.send(token);
});

const resetPassword = expressAsyncHandler(async (req, res, next) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) return next(new AppError(400, "Token has Expired"));

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.json(user);
});
export { register, login, forgetPassword, resetPassword };
