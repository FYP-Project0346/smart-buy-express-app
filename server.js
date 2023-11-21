import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import ProductRouter from "./routes/product_routes.js";

const app = express();

mongoose
  .connect(
    "mongodb+srv://fyp:20F-04@cluster0.agwij.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log("Connection Failed");
  });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(ProductRouter);

const PORT = process.env.PORT | 5000;

app.get("/", (req, res) => {
  res.send(`<h1>Server is Running. </h1>`);
});

app.listen(PORT, (data) => {
  console.log(`App is running on port ${PORT}`);
});
