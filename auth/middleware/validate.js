const { validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors = errors.array().map(({ msg }) => msg);

    return res.status(400).json({ message: JSON.stringify(errors) });
  }
  return next();
};
