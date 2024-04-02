import ContactUsModel from "../models/contactus"

function save(req, res){
    try{
        const data = req.body.data
        ContactUsModel(data).save()
        res.status(200).json()
    }catch(e){
        res.status(400).json()
    }
}

function get(req, res){
    try{
        const data = ContactUsModel.find()
        res.json({data})
    }catch(e){
        res.status(400).json()
    }
}