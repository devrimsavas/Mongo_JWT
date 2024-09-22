var express = require("express");
var router = express.Router();

// Render the login page with a button to trigger Auth0 login
// if we can use out own page
/*
router.get("/login", (req, res) => {
  res.render("login"); // Render 'login.ejs' when /login is visited
});

*/

// This route triggers the Auth0 login and redirects to the car page after successful login login-auth0
router.get("/login", (req, res) => {
  res.oidc.login({ returnTo: "/users" }); // Redirect to '/cars' after login
});

router.get("/logout", (req, res) => {
  res.oidc.logout({ returnTo: "/" });
});

module.exports = router;
