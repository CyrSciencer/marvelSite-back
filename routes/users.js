//All imports
const express = require("express");
const User = require("../models/User");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//Inter-route creation
const router = express.Router();
//User routes
router.post("/signup", async (req, res) => {
  try {
    if (!req.body.user || !req.body.password || !req.body.email) {
      console.log("Missing input");
      return res.status(400).json({ message: "Missing input" });
    }
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      //   console.log("taken");
      res.status(409).json({ message: "Email already taken" });
    } else {
      // console.log(1);

      const password = req.body.password;
      const salt = uid2(16);
      const newUser = new User({
        email: req.body.email,
        user: req.body.user,
        token: uid2(30),
        salt: salt,
        hash: SHA256(password + salt).toString(encBase64),
      });
      console.log(newUser);

      await newUser.save();
      res.json({
        _id: newUser._id,
        token: newUser.token,
        user: newUser.user,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
});
//-------------------------------------------------------------------------------------------------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);

    // console.log(user.hash);
    // console.log(checkPassword);
    if (!user) {
      return res
        .status(401)
        .json({ message: "The combinaison email / password is wrong" });
    }
    const checkPassword = SHA256(req.body.password + user.salt).toString(
      encBase64
    );
    if (user.hash !== checkPassword) {
      return res
        .status(401)
        .json({ message: "The combinaison email / password is wrong" });
    }
    //Show user data
    res.json({
      _id: user._id,
      token: user.token,
      user: user.user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
});
//Export of userRoute

module.exports = router;
