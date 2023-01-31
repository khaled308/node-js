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

const productRoutes = Router();

productRoutes
  .route("/")
  .post(
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
  .put(updateProductValidator, updateProductData, updateProduct)
  .delete(deleteProduct);
export default productRoutes;
