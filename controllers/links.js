const Product = require("../models/product")
const axios = require('axios'); 

async function checkLinks(req, res) {
    try {
        // Get one product from "shophive"
        const data = await Product.find({ site: "shophive" }).skip(0).limit(1000);

        if (data.length === 0) {
            return res.status(404).json({ msg: "No products found" });
        }

        const brokenLinks = [];

        for (let i = 0; i < data.length; i++) {
            const product_url = data[i].product_url;

            try {
                // Test the product URL
                const response = await axios.get(product_url);

                if (response.status !== 200) {
                    brokenLinks.push(product_url); // Store broken links
                }
            } catch (error) {
                brokenLinks.push(product_url); // Store if request fails
            }
        }

        // Return the list of broken links, if any
        res.json({ "broken links": brokenLinks });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while checking links" });
    }
}



module.exports = {
    checkLinks
}