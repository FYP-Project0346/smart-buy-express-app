const { SendMail } = require("../general_functions/send_mail.js")
const dotenv = require("dotenv")
const { envFilePath } = require("../constants.js")
const userController = require("./user.js")
const { PriceTrackerModel } = require("../models/price_tracker.js")
const productController = require("./product_controller.js")
const sendMail = require("../general_functions/send_mail.js")

const SendTestEmail = (req, res) => {
    try {
        dotenv.config(envFilePath)
        SendMail(`
    <h1>This is Test Email</h1>
    `, "fake.mail.0346@gmail.com")


        res.json({ msg: "Email Sent" })
    } catch (e) {
        res.status(400).json({ error: "Couldn't Send Email" })
    }
}

async function subscribe(req, res) {
    try {
        const data = req.body
        const operation = await PriceTrackerModel(data)
        await operation.save();
        res.json({})
    } catch (e) {
        res.status(400).json({})
    }
}

async function check_tracking(req, res) {
    const product_id = req.query.product_id
    const track = await _check_tracking(product_id)
    res.json({ data: track })
}

async function _check_tracking(id) {
    const data = []
    const track = await PriceTrackerModel.find({ product_id: id });
    const product = await productController._getById(id)
    // return product

    await Promise.all(
        track.map(async (e) => {
            if (product.price >= e.price) {
                return
            }
            let user = await userController.getUserById(e.customer_id)
            user = user[0]
            await sendMail.SendMail(`
            <h1>Dear ${user.firstname} ${user.lastname}</h1>
            <h2>The Price of Product "${product.title}" has come low.</h2>
            <h2>now it's price is: <span style="color:blue">${product.price}</span></h2>
            <h3>Follow this link to buy: LINK NEEDS TO BE PROVIDED</h3>
            `, user.email)
            data.push(user.email)
        })
    )
    return data;
}

async function isSubscribed(req, res){
    try{
        const customer_id = req.query.customer_id;
        const product_id = req.query.product_id;
        const track = await PriceTrackerModel.find({
            $and:[
                {customer_id},
                {product_id},
            ]
        })
        res.json({subscribed: track.length != 0})
    }catch(e){
        res.status(400).json({});
    }
}

async function unsubscribe(req, res){
    try{
        const customer_id = req.query.customer_id;
        const product_id = req.query.product_id;
        await PriceTrackerModel.findOneAndDelete({
            $and:[
                {customer_id},
                {product_id},
            ]
        })
        res.json({})
    }catch(e){
        res.status(400).json({});
    }
}


module.exports = {
    SendTestEmail,
    subscribe,
    check_tracking,
    isSubscribed,
    unsubscribe,
}

