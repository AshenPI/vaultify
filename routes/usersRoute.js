const express = require("express");
const usersModel = require("../models/usersModel");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await usersModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    });
    if (user) {
      res.send(user);
    } else {

      res.status(404).json();
      
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const newUser = new usersModel({ ...req.body, verified: false });
    await newUser.save();
    res.send("user registered sucessfuly");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
