import Product from "../models/Product.js";
import {
  create,
  deleteItem,
  getAll,
  getOne,
  update,
} from "../utils/controllerFactory.js";

export const createProduct = create(Product);

export const getProducts = getAll(Product);

export const getProduct = getOne(Product);

export const updateProduct = update(Product);

export const deleteProduct = deleteItem(Product);
