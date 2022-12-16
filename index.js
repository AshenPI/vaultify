const express = require("express");
const dbConnect = require("./dbConnection");
const itemsrouter = require("./routes/itemsRoute");
const app = express();
app.use(express.json());
require("dotenv").config();

app.use("/api/items" , itemsrouter);


app.listen(process.env.PORT , ()=>{
    console.log("running on " , process.env.PORT);
})

