/*
Ariel Chau
#301151530
Midterm lab Assignment
*/
// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const {response} = require('../config/app');

// define the employee model
let Employee = require("../models/employee");

/* GET employee List page. READ */
router.get("/", (req, res, next) => {
  // find all employee in the employee_detail collection
  Employee.find((err, employeeList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("employees/list", {title: "Employees",EmployeeList: employeeList,});
    }
  });
});

//  GET the Employee Details page in order to add a new employee
router.get("/add", (req, res, next) => {
  res.render('employees/add',{title:'Add Employees'});
});

// POST process the Employee Details page and create a new Employee - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newEmployee = Employee({
    "employeeid":req.body.employeeid,
    "name":req.body.name,
    "department":req.body.department,
    "designation":req.body.designation,
    "salary":req.body.salary
  });

  Employee.create(newEmployee, (err,Employee)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/employee-list');
    }
  })
});

// GET the Employee Details page in order to edit an existing Employee
router.get("/edit/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  let id = req.params.id;

  Employee.findById(id,(err, employeeToEdit)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.render('employees/edit',{title:'Edit Employee',employee:employeeToEdit})
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  let id = req.params.id;
  let updatedEmployee = Employee({
    "_id":id,
    "employeeid":req.body.employeeid,
    "name":req.body.name,
    "department":req.body.department,
    "designation":req.body.designation,
    "salary":req.body.salary
  })

  Employee.updateOne({_id:id},updatedEmployee,(err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/employee-list');
    }
  })
  
});

// GET - process the delete by specific employeename
router.get("/delete/:name", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  let name = req.params.name;
  
  Employee.remove({name:name},(err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/employee-list')
    }
  })
});

module.exports = router;
