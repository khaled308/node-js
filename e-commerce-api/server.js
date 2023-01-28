import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectToDB from "./config/db.js";

dotenv.config();
connectToDB();
const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 8000);
