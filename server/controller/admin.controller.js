const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require("../model/User");

module.exports = {
  getAdmiin: (req,res,next) => {
    res.json({
      message: 'welcome admin'
    })
  },
  loginAdmin: (req, res, next) => {
    passport.authenticate('local',{session: false},(err,admin,info) => {
      if(!admin.isAdmin) return res.json({
        message: 'Admin not found'
      })
      const token = jwt.sign({ admin }, 'secret');
      res.json({ 
       message: "successfully logged in",
       token: token
     }); 
    }) (req,res, next)
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
  }
}