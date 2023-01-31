import { check } from "express-validator";
import validate from "../middleware/validate.js";
import Category from "../models/Category.js";

export const createCategoryValidator = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("name must be at least 2 characters")
    .custom(async (val, { req }) => {
      const category = await Category.findOne({
        name: val,
        parentId: req.body.parentId,
      });
      if (category) return Promise.reject("Category already Exist");
    }),

  check("parentId")
    .optional()
    .isMongoId()
    .withMessage("Parent Category not Exist")
    .custom(async (val) => {
      const category = await Category.findById(val);
      if (!category) return Promise.reject("Parent Category not Exist");
    }),

  validate,
];

export const updateCategoryValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("name must be at least 2 characters")
    .custom(async (val, { req }) => {
      const category = await Category.findOne({ name: val });
      if (category && String(category._id) != req.params.id)
        return Promise.reject("Category already Exist");
    }),

  check("parentId")
    .optional()
    .isMongoId()
    .withMessage("Parent Category not Exist")
    .custom(async (val) => {
      const category = await Category.findById(val);
      if (!category) return Promise.reject("Parent Category not Exist");
    }),

  validate,
];
