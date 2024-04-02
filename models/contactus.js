const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
    datetime: String,
    isloggedIn: Boolean,
    cus_id: String
})

const ContactUsModel = mongoose.model("contactus", schema)

module.exports = {
    ContactUsModel
}