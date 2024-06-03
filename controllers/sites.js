const {Sites} = require("../models/sites")

const addSite = async (req, res)=>{
    try{
        const name = req.body.name
        const allow = req.body.allow
        const url = req.body.url
        const logo = req.body.logo
        await Sites({
            name,
            allow,
            url,
            logo,
        }).save();
        res.json({
            code: 200,
            msg: "site has been added.",
        });
    }catch(e){
        res.json({code: 400, msg: "couldn't add site.. "})
    }
}


const removeSite = async (req, res)=>{
    try{
        const id = req.query.id
        await Sites.findOneAndDelete({_id: id});
        res.json({
            code: 200,
            msg: "site has been removed",
        });
    }catch(e){
        res.json({code: 400, msg: "couldn't remove site.. "})
    }
}

const getSites = async (req, res)=>{
    try{
        const sites = await Sites.find();
        res.json({
            sites
        });
    }catch(e){
        res.json({code: 400, msg: "couldn't remove site.. "})
    }
}


module.exports = {
    addSite,
    removeSite,
    getSites,
}