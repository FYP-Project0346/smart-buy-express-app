const Category = require("../models/categories.js");
const Product = require("../models/product.js");
const { data } = require("../testing/data.js");

const save = async (req, res) => {
  try {
    const data = req.body;
    let product = await Product(data);
    await product.save();
    res.json({});
  } catch (error) {
    res.status(400).json({ error });
  }
};

const saveAnArray = async (req, res) => {
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

// const get = async (req, res) => {
//   try {
//     let search = req.query.search.replaceAll(" ", "|")
//     query = {
//       title:{
//         $regex:  search,
//         $options: "i"
//       }
//     }
//     let data = await Product.find(query)
//     res.json(data);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

const get = async (req, res) => {
  try {
    let max = req.query.max || 0;
    let min = req.query.min || 0;
    let limit = req.query.limit || 12;
    let skip = req.query.skip || 0;
    let allowedSites = req.query.sites
    let search = req.query.search || ""
    search = req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replaceAll(" ", "|");

    try{
      allowedSites = JSON.parse(allowedSites)
      if (allowedSites = []){
        allowedSites = ["shophive"]
      }
    }catch(e){
      allowedSites = ["shophive"]
    }
    if (min > max){
      res.status(400).json({code: 203})
      return;
    }
    let query;
    if (max > 0 & min > 0){
      query = {
        price: {
          $lte: max,
          $gte: min,
        },
        site:{
          $in: allowedSites
        }
      }
    } else if (max > 0 & min === 0){
      query = {
        price: {
          $lte: max,
        },
        site:{
          $in: allowedSites
        }
      }
    } else if (max === 0 & min > 0){
      query = {
        price: {
          $gte: min,
        },
        site:{
          $in: allowedSites
        }
      }
    } else{
      query = {
        site:{
          $in: allowedSites
        }
      }
    }

    if (search !== ""){
      query = {
        ...query,
        title: {
          $regex: search,
          $options: "i"
        }
      }
    }

    let data = await Product.find(query).skip(skip).limit(limit);

    res.json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getById = async (req, res) => {
  try {
    const _id = req.query.id;
    const data = await _getById(_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({code: 202});
  }
};

const _getById = async (id)=>{
  const data = await Product.find({
    _id:id,
  });
  return data[0];
}


const getByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const data = await Product.find({
      category,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: "Operation Failed!", error: error.message });
  }
};

const uploadAllData = async (req, res) => {
  // This method uploads data from a local file in this project
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

const deleteAllProducts = async (req, res) => {
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

const updateCategories = async (req, res) => {
  let category = [];
  try {
    let data = await Product.find();
    for (let i = 0; i < data.length; i++) {
      let notFound = true;
      for (let j = 0; j < category.length; j++) {
        if (data[i].category === category[j]) {
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

const getCategories = async (req, res) => {
  try {
    let data = await Category.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};



module.exports = {
  save,
  saveAnArray,
  get,
  getById,
  _getById,
  getByCategory,
  uploadAllData,
  deleteAllProducts,
  updateCategories,
  getCategories,
}