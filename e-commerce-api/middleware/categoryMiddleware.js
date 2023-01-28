import slugify from "slugify";

const createCategoryData = (req, res, next) => {
  const { name, image, parentId } = req.body;
  const slug = slugify(name);

  req.data = { name, image, parentId, slug };
  next();
};

export { createCategoryData };
