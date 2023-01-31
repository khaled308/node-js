import { Router } from "express";
import {
  createProductData,
  updateProductData,
} from "../middleware/productMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import {
  createProductValidator,
  updateProductValidator,
} from "../validators/productValidator.js";
import { imagesProcess, upload } from "../middleware/file-upload.js";
import { isAdmin } from "../middleware/auth.js";

const productRoutes = Router();

productRoutes
  .route("/")
  .post(
    isAdmin,
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    imagesProcess,
    createProductValidator,
    createProductData,
    createProduct
  )
  .get(getProducts);

productRoutes
  .route("/:id")
  .get(getProduct)
  .put(isAdmin, updateProductValidator, updateProductData, updateProduct)
  .delete(isAdmin, deleteProduct);
export default productRoutes;
