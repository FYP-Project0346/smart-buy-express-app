const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const {ProductRouter} = require("./routes/product_routes.js");
const {user_router} = require("./routes/user.js");
const {authRouter} = require("./routes/auth.js");
const {priceTrackerRouter} = require("./routes/price_tracker.js");
const {contactus_route} = require("./routes/contactus_route.js")
const {linkRouter} = require("./routes/link.js")
const {admin_route} = require("./routes/admin.js")

const app = express();

const remoteConnection =
  "mongodb+srv://fyp:20F-04@cluster0.agwij.mongodb.net/smartbuy?retryWrites=true&w=majority";
const localConnection = "mongodb://127.0.0.1:27017/smartbuy";

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(localConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connection Established");
  })
  .catch((err) => {
    console.log("Connection Failed");
  });

app.use("/products", ProductRouter);
app.use("/user", user_router);
app.use("/auth", authRouter);
app.use("/price-track", priceTrackerRouter)
app.use("/contact", contactus_route)
app.use("/links", linkRouter)
app.use("/admin", admin_route)

const PORT = process.env.PORT | 5000;

app.get("/", (req, res) => {
  res.send(`<h1>Server is Running. </h1>`);
});

app.listen(PORT, (data) => {
  console.log(`App is running on port ${PORT}`);
});
