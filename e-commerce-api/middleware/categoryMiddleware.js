import slugify from "slugify";

const prepareSchema = (data) => {
  const keys = ["name", "image", "parentId"];
  const res = {};

  for (let key of keys) {
    if (data[key]) res[key] = data[key];
  }

  return res;
};

const createCategoryData = (req, res, next) => {
  req.data = prepareSchema(req.body);

  req.data.slug = slugify(req.body.name);
  next();
};

const updateCategoryData = (req, res, next) => {
  req.data = prepareSchema(req.body);

  if (req.data.name) req.data.slug = req.data.name;

  next();
};

export { createCategoryData, updateCategoryData };
