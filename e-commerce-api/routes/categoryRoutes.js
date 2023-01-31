import { Router } from "express";
import {
  createCategoryData,
  updateCategoryData,
} from "../middleware/categoryMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  getSubCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/categoryValidator.js";
import { imagesProcess, upload } from "../middleware/file-upload.js";
import { isAdmin } from "../middleware/auth.js";

const categoryRoutes = Router();

categoryRoutes
  .route("/")
  .post(
    isAdmin,
    upload.single("image"),
    imagesProcess,
    createCategoryValidator,
    createCategoryData,
    createCategory
  )
  .get(getCategories);

categoryRoutes
  .route("/:id")
  .get(getCategory)
  .put(isAdmin, updateCategoryValidator, updateCategoryData, updateCategory)
  .delete(isAdmin, deleteCategory);

categoryRoutes.get("/:id/subcategories", getSubCategories);
export default categoryRoutes;
