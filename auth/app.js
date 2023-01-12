require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const connectToDB = require("./utils/db");
const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/testRoute");
const errorHandler = require("./middleware/errorHandler");

const app = express();

connectToDB();

app.use(morgan("dev"));

// security middleware
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(cors());
app.use(helmet());
app.use(xss());

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/test", testRoutes);

// not found
app.all("*", (req, res) => {
  res.status(404).send("Not Fount");
});

// error handler
app.use(errorHandler);

app.listen(process.env.PORT || 8000);
