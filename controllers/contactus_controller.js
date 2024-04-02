const {ContactUsModel} = require("../models/contactus")

async function save(req, res){
    try{
        const data = req.body
        const model = await ContactUsModel(data)
        await model.save()
        res.status(200).json({})
    }catch(e){
        res.status(400).json()
    }
}

async function get(req, res){
    try{
        const data = await ContactUsModel.find()
        res.json({data})
    }catch(e){
        res.status(400).json()
    }
}

async function remove(req, res){
    try{
        const id = req.query.id
        await ContactUsModel.findOneAndDelete({
            _id: id
        })
        res.json({})
    }catch(e){
        res.status(400).json()
    }
}

module.exports = {
    save,
    get,
    remove,
}