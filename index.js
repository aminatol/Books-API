// // Dependcies
// const express = require("express");

// const methodOverride = require("method-override");
// const react = require("react");

// //Configurations
//  const app = express();
// require("dotenv").config();
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const mongoose= require('mongoose')


// MIDDLEWARE

app.set("view engine", "jsx");
//app.engine("jsx", require("express-react-views").createEngine());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/books", require("./controllers/books_controller"));

app.get("/", (req, res) => {
 // console.log("Hello World!");
  res.render(" Hello World!");
});
// ROUTES
app.get("/", (req, res) => {
  res.render("home");
});

// API CONTROLLER
app.use("/api", require("./api"));

// WEBAPP CONTROLLER
app.use("/places", require("./controllers/books"));

// 404
app.get("*", (req, res) => {
  res.render("error404");
});
app.listen(process.env.PORT);
