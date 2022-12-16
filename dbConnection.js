const mongoose = require("mongoose");
require("dotenv").config();
const DB_url = process.env.DB_URL;

mongoose.set("strictQuery" , true);
mongoose.connect(DB_url);

let connection = mongoose.connection;

connection.on("connected" , ()=>{
    console.log("mongo connected")
})

connection.on("error" , ()=>{
    console.log("mongo failed")
})