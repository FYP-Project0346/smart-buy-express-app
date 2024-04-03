const {ContactUsModel} = require("../models/contactus")

async function save(req, res){
    try{
        const data = req.body
        const model = await ContactUsModel(data)
        await model.save()
        res.status(200).json({code: 200, msg: "Message Sent"})
    }catch(e){
        res.status(400).json({code: 400, msg: "Some error occured"})
    }
}

async function get(req, res){
    try{
        const data = await ContactUsModel.find()
        res.json({code: 200, data})
    }catch(e){
        res.status(400).json({code: 400, msg: "some error occured"})
    }
}

async function remove(req, res){
    try{
        const id = req.query.id
        await ContactUsModel.findOneAndDelete({
            _id: id
        })
        res.json({code: 200, msg:"Message Deleted"})
    }catch(e){
        res.status(400).json({code: 400, msg: "some error occured"})
    }
}

module.exports = {
    save,
    get,
    remove,
}