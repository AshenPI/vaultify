const express = require("express");
const billsModel = require("../models/billsModel");
const router = express.Router();

router.post("/charge-bill" , async (req , res) =>{
    try {
        const newBill = new billsModel(req.body);
        await newBill.save();
        res.send("Bill Charged succesfully")
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get("/get-bills" , async (req , res)=>{
    try {
        const bills = await billsModel.find()
        res.send(bills)
    } catch (error) {
            res.status(400).json(error);
    }
})

module.exports = router;