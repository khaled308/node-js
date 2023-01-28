import User from "../models/User.js";
import { compare } from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import { signToken } from "../utils/token.js";

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

export { register, login };
