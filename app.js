require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// import auth0
const { requiresAuth, userMiddleware } = require("./requiresAuth");

//connect database
const connectDB = require("./config/connectDatabase");

connectDB();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var carRouter = require("./routes/cars");
var authRouter = require("./routes/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//add auth0
app.use(requiresAuth);
app.use(userMiddleware);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));
app.use(
  express.static(path.join(__dirname, "node_modules/bootstrap-icons/font"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
