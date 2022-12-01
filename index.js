const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

//connectdb
connectDB();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log("server started on " + port);
});
