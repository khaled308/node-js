import { Router } from "express";
import { createCategoryData } from "../middleware/categoryMiddleware.js";
import { createCategory } from "../controllers/categoryController.js";

const categoryRoutes = Router();

categoryRoutes.route("/").post(createCategoryData, createCategory);

export default categoryRoutes;
