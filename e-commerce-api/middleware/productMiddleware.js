import slugify from "slugify";
import uploadToCloud from "../utils/uploadToCloud.js";
import fs from "fs";

const prepareSchema = (data) => {
  const keys = [
    "name",
    "images",
    "description",
    "price",
    "quantity",
    "category",
    "brand",
    "coverImage",
  ];
  const res = {};

  for (let key of keys) {
    if (data[key]) res[key] = data[key];
  }

  return res;
};

const uploadImages = async (req) => {
  const cloudFolder = "mern-shop/products";

  const coverImage = await uploadToCloud(
    "uploads/" + req.files.coverImage[0].filename,
    cloudFolder
  );
  const images = [];

  for (let img of req.files.images) {
    const temp = await uploadToCloud("uploads/" + img.filename, cloudFolder);
    images.push(temp.secure_url);
  }

  req.data.coverImage = coverImage.secure_url;
  req.data.images = images;
};

const createProductData = async (req, res, next) => {
  req.data = prepareSchema(req.body);
  req.data.slug = slugify(req.body.name);

  await uploadImages(req);
  fs.rm("uploads", { recursive: true }, (err) => console.log(err));
  next();
};

const updateProductData = (req, res, next) => {
  req.data = prepareSchema(req.body);

  if (req.data.name) req.data.slug = slugify(req.data.name);

  next();
};

export { createProductData, updateProductData };
