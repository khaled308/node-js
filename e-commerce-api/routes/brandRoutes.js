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

const brandRoutes = Router();

brandRoutes
  .route("/")
  .post(
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
  .put(updateBrandValidator, updateBrandData, updateBrand)
  .delete(deleteBrand);
export default brandRoutes;
