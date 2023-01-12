const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

exports.verifyToken = (req, res, next) => {
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

exports.isAuthorized = (req, res, next) => {
  this.verifyToken(req, res, async () => {
    if (req.userId !== req.body.userId) {
      const err = new AppError("You are not allowed", 403);
      return next(err);
    }
    next();
  });
};
