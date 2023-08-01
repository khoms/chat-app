const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const auth = require("./routes/auth");
const message = require("./routes/message");

dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

var cors = require("cors");

//Connect Db
connectDB();
const app = express(cors({ origin: "*" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use(errorHandler);

app.use("/api/user", auth);
app.use("/api/message", message);




const PORT = process.env.PORT || 3000;
const ipAdd = process.env.IP_ADD;

app.listen(PORT, console.log("Server running in " + ipAdd + ":" + PORT));
