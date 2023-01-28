import Category from "../models/Category.js";
import expressAsyncHandler from "express-async-handler";

export const createCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.create(req.data);

  res.send(category);
});
