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

app.listen(process.env.PORT , ()=>{
    console.log("running on " , process.env.PORT);
})

