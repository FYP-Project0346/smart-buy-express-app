const Category = require("../models/categories.js");
const Product = require("../models/product.js");
const { data } = require("../testing/data.js");

const save = async (req, res) => {
  try {
    const data = req.body;
    let product = await Product(data);
    await product.save();
    res.json({code:200, msg:"Data Saved"});
  } catch (error) {
    res.status(400).json({code:400, error });
  }
};

const saveAnArray = async (req, res) => {
  try {
    const arrayOfData = req.body;
    for (let i = 0; i < arrayOfData.length; i++) {
      const product = await Product(arrayOfData[i]);
      await product.save();
    }
    res.json({code:200, msg:"Data Saved"});
  } catch (error) {
    res.status(400).json({code:400, error });
  }
};

// const get = async (req, res) => {
//   try {
//     let data = await Product.find()
//     res.json(data);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

const get = async (req, res) => {
  try {
    let reqdata = req.query
    let max = reqdata.max || 0
    let min = reqdata.min || 0
    let limit = reqdata.limit || 12
    let skip = reqdata.skip || 0
    let allowedSites = reqdata.sites
    let search = reqdata.search || ''
    search = reqdata.search
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replaceAll(' ', '|')

    const defaultAllowedSites = ['shophive', 'priceoye', 'iShopping', 'bucket.pk', 'HomeShopping']
    try {
      allowedSites = JSON.parse(allowedSites)

      if (allowedSites.length === 0) {
        allowedSites = defaultAllowedSites
      }
    } catch (e) {
      console.log('Error in parsing the data')
      allowedSites = defaultAllowedSites
    }

    if (parseInt(min) > parseInt(max)) {
      res.json({ code: 203, msg: 'min price is greater than max' })
      return
    }
    let query
    if ((max > 0) & (min > 0)) {
      query = {
        price: {
          $lte: max,
          $gte: min,
        },
        site: {
          $in: allowedSites,
        },
      }
    } else if ((max > 0) & (min === 0)) {
      query = {
        price: {
          $lte: max,
        },
        site: {
          $in: allowedSites,
        },
      }
    } else if ((max === 0) & (min > 0)) {
      query = {
        price: {
          $gte: min,
        },
        site: {
          $in: allowedSites,
        },
      }
    } else {
      query = {
        site: {
          $in: allowedSites,
        },
      }
    }


    if (search !== '') {
      query = {
        ...query,
        $or: [
          {
            title: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: search,
              $options: 'i',
            },
          }
        ]
      }
    }

    let data = await Product.find(query)
      .sort({ ratings: -1, price: 1 })
      .skip(skip)
      .limit(limit)

    res.json({ code: 200, data })
  } catch (error) {
    res.status(400).json({ code: 400, error })
  }
}

const getById = async (req, res) => {
  try {
    const _id = req.query.id;
    const data = await _getById(_id);
    res.status(200).json({code:200,data});
  } catch (error) {
    res.status(400).json({code: 400, msg: "some error occured"});
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
    res.status(200).json({code:200, data});
  } catch (error) {
    res.status(400).json({code: 400, msg: "some error occured"});
  }
};

const uploadAllData = async (req, res) => {
  // This method uploads data from a local file in this project
  try {
    for (let i = 0; i < data.length; i++) {
      const product = await Product(data[i]);
      await product.save();
    }
    res.json({code:200, msg: "All the data has been saved" });
  } catch (error) {
    res.status(400).json({code:400, msg:"some unexpected error occured"});
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    const data = await Product.find();
    for (let i = 0; i < data.length; i++) {
      await Product.findOneAndDelete({ _id: data[i]._id });
    }

    res.status(200).json({code:200, msg: "All the products has been deleted" });
  } catch (error) {
    res.status(400).json({code:400, msg: "Operation Failed!", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
      const id = req.query.id;
      await Product.findOneAndDelete({ _id: id });
    

    res.status(200).json({code:200, msg: "Products has been deleted" });
  } catch (error) {
    res.status(400).json({code:400, msg: "Operation Failed!", error: error.message });
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

    res.json({code:200, data:category});
  } catch (error) {
    res.status(400).json({code:400, error });
  }
};

const getCategories = async (req, res) => {
  try {
    let data = await Category.find();
    res.json({code:200, categories: data});
  } catch (error) {
    res.status(400).json({code: 400, error });
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
  deleteProduct,
}