import { check } from "express-validator";
import validate from "../middleware/validate.js";
import Brand from "../models/Brand.js";

export const createBrandValidator = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("name must be at least 2 characters")
    .custom(async (val, { req }) => {
      const category = await Brand.findOne({ name: val });
      if (category) return Promise.reject("Category already Exist");
    }),

  validate,
];

export const updateBrandValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("name must be at least 2 characters")
    .custom(async (val, { req }) => {
      const brand = await Brand.findOne({ name: val });
      if (brand && String(brand._id) != req.params.id)
        return Promise.reject("Category already Exist");
    }),

  validate,
];
