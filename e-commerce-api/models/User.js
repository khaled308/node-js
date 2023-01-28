import mongoose from "mongoose";
import { hash } from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishLists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "WishList",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      city: { type: String },
      address: { type: String },
      province: { type: String },
      postalCode: { type: String },
      country: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
