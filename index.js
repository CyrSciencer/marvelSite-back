//all imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");
const usersRoutes = require("./routes/users");
const favRoutes = require("./routes/favorites");
//Connection to database
mongoose.connect(process.env.MONGODB_URI);
//express activation
const serv = express();
serv.use(cors());
//serv uses
serv.use(express.json());
//All routes
serv.use(comicsRoutes);
serv.use(charactersRoutes);
serv.use(usersRoutes);
serv.use(favRoutes);
//Other routes
serv.get("/", (req, res) => {
  res.json("Welcome");
});
serv.all("*", (req, res) => {
  res.status(404).json("Route not found");
});
//Serv starting
serv.listen(3000, () => {
  console.log("Server has started");
});
