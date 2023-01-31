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

const categoryRoutes = Router();

categoryRoutes
  .route("/")
  .post(
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
  .put(updateCategoryValidator, updateCategoryData, updateCategory)
  .delete(deleteCategory);

categoryRoutes.get("/:id/subcategories", getSubCategories);
export default categoryRoutes;
