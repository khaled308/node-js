const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectToDB = async () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("connection done"))
    .catch((err) => console.log(err));
};

module.exports = connectToDB;
