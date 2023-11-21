import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: String,
    desc: String,
    pic: [String],
    price: Number,
    specifications: String,
    link: String,
    reviews: [String],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
