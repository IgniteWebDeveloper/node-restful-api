// configure dotenv
require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// require userRoutes
const userRoutes = require("./routes/userRoutes");

// connect database
require("./config/database").connectdatabase();

// config express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);

// use error middleware
app.use(require("./middleware/Error"));

app.listen(process.env.PORT, console.log("Listening on port 3000"));
