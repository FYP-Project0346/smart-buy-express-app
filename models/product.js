import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: String,
    desc: String,
    pic: [String],
    price: Number,
    spec: String,
    link: String,
    reviews: [String],
    cat: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
