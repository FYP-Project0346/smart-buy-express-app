const mongoose = require("mongoose")

const schema = mongoose.Schema({
    customer_id: String,
    product_id: String,
});

const PriceTrackerModel = mongoose.model("Tracker", schema)

module.exports = {PriceTrackerModel}