var express = require("express");
var router = express.Router();
const { requiresAuth } = require("express-openid-connect");

// Make sure all routes are protected with requiresAuth
router.use(requiresAuth());

// GET users listing and render user details
router.get("/", (req, res, next) => {
  const user = req.oidc.user; // Get the user object from Auth0
  console.log(user);

  // Pass user data to the EJS template for rendering
  res.render("users", {
    title: "User Profile",
    user: user,
  });
});

module.exports = router;
