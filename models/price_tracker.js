const mongoose = require("mongoose")

const schema = mongoose.Schema({
    customer_id: String,
    product_id: String,
    price: Number,
});

const PriceTrackerModel = mongoose.model("Tracker", schema)

module.exports = {PriceTrackerModel}