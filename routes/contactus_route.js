const {
    save,
    get,
    remove
} = require("../controllers/contactus_controller")
const express = require("express")

const contactus_route = express.Router()


contactus_route.post("/save", save)
contactus_route.get("/get", get)
contactus_route.delete("/delete", remove)


module.exports =  {contactus_route}