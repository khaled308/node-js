import slugify from "slugify";

const prepareSchema = (data) => {
  const keys = ["name", "image"];
  const res = {};

  for (let key of keys) {
    if (data[key]) res[key] = data[key];
  }

  return res;
};

const createBrandData = (req, res, next) => {
  req.data = prepareSchema(req.body);

  req.data.slug = slugify(req.body.name);
  next();
};

const updateBrandData = (req, res, next) => {
  req.data = prepareSchema(req.body);

  if (req.data.name) req.data.slug = slugify(req.data.name);

  next();
};

export { createBrandData, updateBrandData };
