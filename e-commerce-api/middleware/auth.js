import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!authHeader || !authHeader.startsWith("Bearer") || !decoded) {
      return next(new AppError("token not valid", 400));
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return next(err);
  }
};

export const isAuthorized = (req, res, next) => {
  this.verifyToken(req, res, async () => {
    if (req.userId !== req.body.userId) {
      const err = new AppError("You are not allowed", 403);
      return next(err);
    }
    next();
  });
};

export const isAdmin = (req, res, next) => {
  this.verifyToken(req, res, async () => {
    const user = User.findById(req.userId);

    if (!user.isAdmin) {
      const err = new AppError("You are not allowed", 403);
      return next(err);
    }
    next();
  });
};
