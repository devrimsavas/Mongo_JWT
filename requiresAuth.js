require("dotenv").config();

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.BASE_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_ID,
};

//export also auth

const requiresAuth = auth(config);

const userMiddleware = (req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
};

module.exports = {
  requiresAuth,
  userMiddleware,
};
