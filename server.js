const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log("Connection Failed");
  });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT | 5000;

app.get("/", (req, res) => {
  res.send(`<h1>Server is Running. </h1>`);
});

app.listen(PORT, (data) => {
  console.log(`App is running on port ${PORT}`);
});
