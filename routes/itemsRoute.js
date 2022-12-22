const express = require("express");
const itemModel = require("../models/itemsModel");
const router = express.Router();

router.get("/getall" , async (req , res)=>{

    try {
        const items  = await itemModel.find();
        res.send(items)
    } catch (error) {
        res.send(error);
    }
})

router.post("/add-item" , async (req , res)=>{

try {
    const newitem = new itemModel(req.body);
    await newitem.save();
    res.send("Item added succesfully")
} catch (error) {
    res.send(error);
}
})
module.exports = router;