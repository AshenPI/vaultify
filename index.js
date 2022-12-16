const express = require("express");
const dbConnect = require("./dbConnection");
const app = express();

require("dotenv").config();

app.get("/" , (req , res)=>{
    res.send("hello");
})


app.listen(process.env.PORT , ()=>{
    console.log("running on " , process.env.PORT);
})

