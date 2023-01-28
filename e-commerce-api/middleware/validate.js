import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors = errors.array().map(({ msg }) => msg);

    return res.status(400).json({ message: JSON.stringify(errors) });
  }
  return next();
};

export default validate;
