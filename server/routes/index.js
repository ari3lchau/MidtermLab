/*
Ariel Chau
#301151530
Midterm lab Assignment
*/
// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the game model
let employee = require("../models/employee");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    employees: "",
  });
});

module.exports = router;
