const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: String,
    url: String,
    logo: String,
    allow: Boolean,
})

const Sites = mongoose.model("sites", schema)

module.exports = {
    Sites,
}