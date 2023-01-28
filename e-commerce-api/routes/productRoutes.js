import { Router } from "express";
import { getAllProducts } from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get("/", getAllProducts);

export default productRoutes;
