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
    slug: {
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
    colors: [String],
    images: [String],
    coverImage: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingQty: {
      type: Number,
      default: 0,
    },
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

productSchema.pre("find", function (next) {
  this.populate({ path: "category", select: "name" });
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
