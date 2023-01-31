import Brand from "../models/Brand.js";
import {
  create,
  deleteItem,
  getAll,
  getOne,
  update,
} from "../utils/controllerFactory.js";

export const createBrand = create(Brand);

export const getBrands = getAll(Brand);

export const getBrand = getOne(Brand);

export const updateBrand = update(Brand);

export const deleteBrand = deleteItem(Brand);
