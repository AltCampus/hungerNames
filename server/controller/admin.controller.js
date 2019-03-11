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

  loginAdmin: (req, res, next) => {
    passport.authenticate('local', {
      session: false
    }, (err, admin, info) => {
      if (!admin.isAdmin) return res.status(417).json({
        error: 'Admin not found'
      })
      const token = jwt.sign({
        admin
      }, 'secret');
      res.json({
        message: "successfully logged in",
        token: token
      });
    })(req, res, next)
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

  addMenu: (req, res, next) => {
    Menu.find({}, (err, menu) => {
      if (err) return res.status(500).json({ error: 'Could not get menu' })
      res.json({
        menu: menu[0].menu,
        message: 'item menu is found'
      })
    }) 
  },

  updateMenu: (req, res, next) => {
    // getting updated menu from req.body
    const { menu } = req.body;
    Menu.findOneAndUpdate({}, { menu }, { new: true }, (err, data) => {
      if (err) return res.json({ error: 'Could not update the menu' })
      res.json({
        message: 'Successfully updated the menu',
        menu: data
      })
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