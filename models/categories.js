const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category: String,
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
