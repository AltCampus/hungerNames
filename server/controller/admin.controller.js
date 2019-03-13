const passport = require('passport');
const jwt = require('jsonwebtoken');
const Student = require("../model/Student");
const Menu = require("../model/Menu");
const User = require('../model/Student')

module.exports = {
  getAdmin: (req, res, next) => {
    res.json({
      message: 'welcome admin'
    })
  },
  
  getStudent: (req, res, next) => {
    Student.aggregate([ {$match: { isAdmin : false, isKitchenStaff: false}}, 
      {$group: {_id: "Students List" , students : { $push: { id: "$_id", name:
    "$name",email: "$email" }}}}],(err,user) => {
        if (user.length === 0 ) return res.json({message: 'no student found in database'})
       if(err) return res.json({message:'coulnt fetch'});
       res.json({
          user:user[0].students
       })
     })
  },

  verifyAdmin: (req, res, next) => {
    res.json({
      message: 'verified'
    })
  },

  forgetPassword: (req, res, next) => {
    res.json({
      message: 'password rest'
    })
  },

  getMenuList: (req, res, next) => {
    Menu.find({}, (err, menu) => {
      if (err) return res.status(500).json({ error: 'Could not get menu' })
      res.json(menu)
    }) 
  },

  updateMenu: (req, res, next) => {
    // getting updated menu from req.body
    const { menu } = req.body;
    Menu.find({}, function(err, prevMenu) {
      // TODO: PUT check for if menu exists or length is greater than 0
      if(!prevMenu.length) {
        return res.json({ message: "Menu doesn't exist yet."})
      }

      var currentMenu = prevMenu[0];
      currentMenu.menu = menu;
      currentMenu.save(function(err, saved) {
        res.json(saved)
      });
    })
  },

  removeStudent: (req, res, next) => {
    const studentId = req.params.id;
    User.findByIdAndDelete(studentId, (err, students) => {
      if (err) return res.json({ error: 'Could not delete student' });
      res.json({
        message: 'Successfully deleted',
        students: students
      })
    })
  }
}