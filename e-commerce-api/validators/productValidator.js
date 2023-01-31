import { check } from "express-validator";
import validate from "../middleware/validate.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

export const createProductValidator = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("name must be at least 2 characters")
    .custom(async (val, { req }) => {
      const product = await Product.findOne({
        name: val,
        category: req.body.category,
      });
      if (product) return Promise.reject("Product already Exist");
    }),
  check("description")
    .isLength({ min: 10 })
    .withMessage("description is required"),

  check("coverImage").notEmpty().withMessage("Cover image is required"),
  check("category")
    .isMongoId()
    .withMessage("Category not Exist")
    .custom(async (val) => {
      const category = await Category.findById(val);
      if (!category) return Promise.reject("Category not Exist");
    }),

  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Category not Exist")
    .custom(async (val) => {
      const brand = await Brand.findById(val);
      if (!brand) return Promise.reject("brand not Exist");
    }),

  check("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price not valid")
    .isLength({ max: 30 })
    .withMessage("Too long price")
    .toFloat(),

  check("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isNumeric()
    .withMessage("quantity not valid")
    .isLength({ max: 30 })
    .withMessage("Too long price"),

  check("colors")
    .optional()
    .isArray()
    .withMessage("please enter array of colors"),
  validate,
];

export const updateProductValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("name must be at least 2 characters")
    .custom(async (val, { req }) => {
      const product = await Product.findOne({ name: val });
      if (product && String(product._id) != req.params.id)
        return Promise.reject("Product already Exist");
    }),

  validate,
];
