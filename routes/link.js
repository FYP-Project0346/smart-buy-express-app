const {
    checkLinks
} = require("../controllers/links.js")

const express = require("express")

const linkRouter = express.Router();


linkRouter.get("/check", checkLinks)


module.exports = {
    linkRouter
}