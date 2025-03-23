//imports
const express = require("express");
const User = require("../models/User");
const Favorite = require("../models/Favorite");
const isAuthenticated = require("../middleware/isAuthenticated");
//Inter-route creation
const router = express.Router();
//add favorite route
router.post("/favorite/add", isAuthenticated, async (req, res) => {
  const user = await User.findOne({
    token: req.headers.authorization.replace("Bearer ", ""),
  });
  // console.log(user._id.toString());
  const userID = user._id.toString();
  console.log(userID);

  const favorites = await Favorite.findOne({
    refID: req.params.id + " $ " + userID.slice(-10),
  });
  // console.log(await Favorite.findOne({ name: req.body.name }));

  if (favorites) {
    res.json("Already in fav");
  } else {
    try {
      const { category, refID, refName } = req.body;
      const newFav = new Favorite({
        category,
        refID: refID + " $ " + userID.slice(-10),
        refName,
        owner: user._id,
      });
      await newFav.save();
      res.json(newFav);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
});
//delete favorite route
router.delete("/favorite/:id", isAuthenticated, async (req, res) => {
  try {
    console.log("delete route");
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    });
    const userID = user._id.toString();

    const favToDelete = await Favorite.findOneAndDelete({
      refID: req.params.id + " $ " + userID.slice(-10),
    });
    res.json("deleted");
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
});
//get a favorite route
router.get("/favorite/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    });
    const userID = user._id.toString();
    // console.log(user);

    const oneOfFav = await Favorite.findOne({
      refID: req.params.id + " $ " + userID.slice(-10),
      owner: user._id,
    });
    res.json(oneOfFav);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
//get all favorites route
router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    });
    const allFav = await Favorite.find({
      owner: user._id,
    });
    res.json(allFav);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
//Export of route
module.exports = router;
