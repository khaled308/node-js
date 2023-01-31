import express from "express";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/AppError.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/products/", productRoutes);
app.use("/api/v1/categories/", categoryRoutes);
app.use("/api/v1/brands/", brandRoutes);
app.use("/api/v1/users/", userRoutes);

app.all("*", (req, res, next) => {
  const error = new AppError("Not Found", 404);
  next(error);
});

app.use(errorHandler);

export default app;
