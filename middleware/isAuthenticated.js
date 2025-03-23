const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({
      error: "Identify yourself",
    });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  const user = await User.findOne({
    token: token,
  });
  if (!user) {
    return res.json({
      error: "Not found",
    });
  }
  //return res.json(user);//null if not present
  req.user = user;
  next();
};

module.exports = isAuthenticated;
