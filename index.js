const express = require("express");
const dbConnect = require("./dbConnection");
const itemsrouter = require("./routes/itemsRoute");
const usersRouter = require("./routes/usersRoute");
const billRouter = require("./routes/billsRoute");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use("/api/bills" , billRouter);
app.use("/api/items" , itemsrouter);
app.use("/api/users" , usersRouter);

const path = require("path");

if(process.env.NODE_ENV === 'production'){
    app.use("/" , express.static("client/build"));

    app.get("*" , (req , res) =>{
        res.sendFile(path.resolve(__dirname , "client/build/index.html"))
    })
}


app.listen(process.env.PORT || 8000  , ()=>{
    console.log("running on " , process.env.PORT);
})

