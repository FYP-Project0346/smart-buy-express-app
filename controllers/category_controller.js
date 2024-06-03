const Category  = require("../models/categories")


const addCategory = async (req, res)=>{
    try{
        const category = req.body.name;
        await Category({category}).save();
        res.json({code: 200, msg: "category added"})
    }catch(e){
        res.json({code: 400, msg: "Error occured"})
    }
}


const deleteCategory = async (req, res)=>{
    try{
        const id = req.query.id;
        await Category().findOneAndDelete({_id: id});
        res.json({code: 200, msg: "category added"})
    }catch(e){
        res.json({code: 400, msg: "Error occured"})
    }
}

const getCategory = async (req, res)=>{
    try{
        const data = await Category().find();
        res.json({code: 200, category: data})
    }catch(e){
        res.json({code: 400, msg: "Error occured"})
    }
}

module.exports = {
    addCategory,
    deleteCategory,
    getCategory,
}