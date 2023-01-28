import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/AppError.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth/", userRoutes);
app.use("/api/v1/products/", productRoutes);
app.use("/api/v1/categories/", categoryRoutes);

app.all("*", (req, res, next) => {
  const error = new AppError("Not Found", 404);
  next(error);
});

app.use(errorHandler);

export default app;
