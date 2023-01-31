import mongoose from "mongoose";
import { hash } from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
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
    phone: String,
    profileImage: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await hash(this.password, 10);
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const passwordToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(passwordToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 1000 * 60 * 10;

  return passwordToken;
};

const User = mongoose.model("User", userSchema);

export default User;
