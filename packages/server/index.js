const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const auth = require("./routes/auth");
const message = require("./routes/message");

const app = express();
dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
//Connect Db
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(errorHandler);

app.use("/api/user", auth);
app.use("/api/message", message);




const PORT = process.env.PORT || 3000;
const ipAdd = process.env.IP_ADD;

app.listen(PORT, console.log("Server running in " + ipAdd + ":" + PORT));
