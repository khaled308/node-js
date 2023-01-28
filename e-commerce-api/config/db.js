import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectToDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("connected successfully"))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

export default connectToDB;
