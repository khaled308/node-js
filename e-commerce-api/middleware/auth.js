import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!authHeader || !authHeader.startsWith("Bearer") || !decoded) {
      return next(new AppError("token not valid", 400));
    }
    req.userId = decoded.userId;
    const user = await User.findById(req.userId);

    if (!user) return next(new AppError("You are not allowed", 403));
    req.user = user;

    next();
  } catch (err) {
    return next(err);
  }
};

export const isAuthorized = (req, res, next) => {
  verifyToken(req, res, async () => {
    if (
      ((req.body.userId && req.userId !== req.body.userId) ||
        req.userId !== req.params.id) &&
      !req.user?.isAdmin
    ) {
      const err = new AppError("You are not allowed", 403);
      return next(err);
    }
    next();
  });
};

export const isAdmin = (req, res, next) => {
  verifyToken(req, res, async () => {
    if (!req.user.isAdmin) {
      const err = new AppError("You are not allowed", 403);
      return next(err);
    }
    next();
  });
};
