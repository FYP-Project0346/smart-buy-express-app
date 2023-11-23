import Category from "../models/categories.js";
import Product from "../models/product.js";
import { data } from "../testing/data.js";

export const save = async (req, res) => {
  try {
    const data = req.body;
    let product = await Product(data);
    await product.save();
    res.json({});
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const saveAnArray = async (req, res) => {
  try {
    const arrayOfData = req.body;
    for (let i = 0; i < arrayOfData.length; i++) {
      const product = await Product(arrayOfData[i]);
      await product.save();
    }
    res.json({ msg: "All the data has been saved!" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const get = async (req, res) => {
  try {
    let data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getById = async (req, res) => {
  try {
    const _id = req.query.id;
    const data = await Product.find({
      _id,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: "Operation Failed!", error: error.message });
  }
};

export const getByCategory = async (req, res) => {
  try {
    const cat = req.query.cat;
    const data = await Product.find({
      cat,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: "Operation Failed!", error: error.message });
  }
};

export const uploadAllData = async (req, res) => {
  try {
    for (let i = 0; i < data.length; i++) {
      const product = await Product(data[i]);
      await product.save();
    }
    res.json({ msg: "All the data has been saved" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    const data = await Product.find();
    for (let i = 0; i < data.length; i++) {
      await Product.findOneAndDelete({ _id: data[i]._id });
    }

    res.status(200).json({ msg: "All the products has been deleted" });
  } catch (error) {
    res.status(400).json({ msg: "Operation Failed!", error: error.message });
  }
};

export const updateCategories = async (req, res) => {
  let category = [];
  try {
    let data = await Product.find();
    for (let i = 0; i < data.length; i++) {
      let notFound = true;
      for (let j = 0; j < category.length; j++) {
        if (data[i].cat === category[j]) {
          notFound = false;
        }
      }
      if (notFound) {
        category.push(data[i].cat);
      }
    }

    // for (let i = 0; i < category.length; i++) {
    //   let database = await Category(category[i]);
    //   await database.save();
    // }

    res.json(category);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getCategories = async (req, res) => {
  try {
    let data = await Category.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};
