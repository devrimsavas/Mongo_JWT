var express = require("express");
var router = express.Router();
const guestUser = require("../guestUser.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  const user = req.oidc.user || guestUser;
  console.log(user);
  res.render("index", {
    title: "Mongo Tutorial",
    user: user,
  });
});

module.exports = router;
