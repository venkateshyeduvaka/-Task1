const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");

const UserRoute = require("./routes/UserRoute");
const ProductRoute = require("./routes/ProductRoute");

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/Project1");

app.use('/user', UserRoute);
app.use("/product", ProductRoute);

app.listen(4000, () => {
    console.log("SERVER IS RUNNING");
});
