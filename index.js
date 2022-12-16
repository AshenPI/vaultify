const express = require("express");
const app = express();

require("dotenv").config();

app.get("/" , (req , res)=>{
    res.send("hello");
})


app.listen(process.env.PORT , ()=>{
    console.log("running on " , process.env.PORT);
})

