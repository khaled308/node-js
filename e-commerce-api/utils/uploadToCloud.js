import cloudinary from "../config/cloudinary.js";

const uploadToCloud = async (fileName, folder) => {
  try {
    const res = await cloudinary.uploader.upload(fileName, { folder });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default uploadToCloud;
