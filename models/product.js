const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: String,
    desc: String,
    price: int,
    specifications: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
