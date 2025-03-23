const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  user: String,
  token: String,
  hash: String,
  salt: String,
});
module.exports = User;
