import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";

const getAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();

  res.send(products);
});

export { getAllProducts };
