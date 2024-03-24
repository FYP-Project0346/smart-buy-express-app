const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    product_url: String,
    title: String,
    price: Number,
    reviews: [String],
    stock: Boolean,
    desc: String,
    images: [String],
    ratings: Number,
    spec: String,
    category: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
