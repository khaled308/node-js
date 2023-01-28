import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
    },
    colors: [String],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [String],
    coverImage: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
