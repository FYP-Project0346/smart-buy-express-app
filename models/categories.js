import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    cat: String,
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", categorySchema);

export default Category;
