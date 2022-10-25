let mongoose = require("mongoose");
/*
Ariel Chau
#301151530
Midterm lab Assignment
*/
// create a model classfor employee
let employeeModel = mongoose.Schema(
  {
    employeeid: Number,
    name: String,
    department: String,
    designation: String,
    salary: Number
  },
  {
    collection: "employees",
  }
);

module.exports = mongoose.model("Employee", employeeModel);
