import { Router } from "express";
import {
  createBrandData,
  updateBrandData,
} from "../middleware/brandMiddleware.js";
import {
  createBrand,
  deleteBrand,
  getBrands,
  getBrand,
  updateBrand,
} from "../controllers/brandController.js";
import {
  createBrandValidator,
  updateBrandValidator,
} from "../validators/brandValidator.js";
import { imagesProcess, upload } from "../middleware/file-upload.js";
import { isAdmin } from "../middleware/auth.js";

const brandRoutes = Router();

brandRoutes
  .route("/")
  .post(
    isAdmin,
    upload.single("image"),
    imagesProcess,
    createBrandValidator,
    createBrandData,
    createBrand
  )
  .get(getBrands);

brandRoutes
  .route("/:id")
  .get(getBrand)
  .put(isAdmin, updateBrandValidator, updateBrandData, updateBrand)
  .delete(isAdmin, deleteBrand);
export default brandRoutes;
