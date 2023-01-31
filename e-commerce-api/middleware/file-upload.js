import path from "path";
import multer from "multer";
import sharp from "sharp";
import AppError from "../utils/AppError.js";
import fs from "fs";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError(400, "images are only allowed"), false);
};

const upload = multer({ storage, fileFilter, limits: 1000000 });

const photoProcess = async (file) => {
  if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
  const fileName = `${Date.now()}-${file.originalname}`;
  await sharp(file.buffer)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.resolve("uploads", fileName));

  return fileName;
};

const uploadFiles = async (files) => {
  for (let file of files) {
    file.filename = await photoProcess(file);
  }
};

const imagesProcess = async (req, res, next) => {
  if (req.file) {
    req.file.filename = await photoProcess(file);
  }

  if (req.files && Array.isArray(req.files)) {
    await uploadFiles(req.files);
  } else if (req.files) {
    for (let [key, value] of Object.entries(req.files)) {
      await uploadFiles(value);
    }
  }

  next();
};

export { upload, imagesProcess };
