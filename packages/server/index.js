const express = require("express");
const dotenv = require("dotenv");

const app = express();

const connectDB = require("./config/db");
//Connect Db
connectDB();

dotenv.config({ path: "./config/config.env" });

app.use(express.json());

const PORT = process.env.PORT || 3000;
const ipAdd = process.env.IP_ADD;

app.listen(PORT, console.log("Server running in " + ipAdd + ":" + PORT));
