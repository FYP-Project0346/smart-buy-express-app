const {
    SendTestEmail, 
    subscribe, 
    isSubscribed,
    unsubscribe,
    check_tracking,
    updateDeal
} = require("../controllers/price_tracker_controller.js")
const express = require("express")

const priceTrackerRouter = express.Router()


priceTrackerRouter.get("/send-test-email", SendTestEmail)
priceTrackerRouter.post("/subscribe", subscribe)
priceTrackerRouter.get("/check-call", check_tracking)
priceTrackerRouter.get("/is-subscribed", isSubscribed)
priceTrackerRouter.delete("/unsubscribe", unsubscribe)
priceTrackerRouter.post("/update-deal-status", updateDeal);

module.exports =  {priceTrackerRouter}