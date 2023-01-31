import Category from "../models/Category.js";
import expressAsyncHandler from "express-async-handler";
import {
  create,
  deleteItem,
  getAll,
  getOne,
  update,
} from "../utils/controllerFactory.js";

export const createCategory = create(Category);

export const getCategories = getAll(Category);

export const getCategory = getOne(Category);

export const updateCategory = update(Category);

export const deleteCategory = deleteItem(Category);

export const getSubCategories = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const categories = await Category.find({ parentId: id });

  res.send(categories);
});
