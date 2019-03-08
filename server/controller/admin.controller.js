const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require("../model/User");
const Menu = require("../model/Menu");

module.exports = {
  getAdmiin: (req, res, next) => {
    res.json({
      message: 'welcome admin'
    })
  },
  loginAdmin: (req, res, next) => {
    passport.authenticate('local', {
      session: false
    }, (err, admin, info) => {
      if (!admin.isAdmin) return res.json({
        message: 'Admin not found'
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
    
    const newMenu = new Menu({
      "monday": {
        breakfast: ['poha'],
        lunch: ['rice', 'aloo palak', 'dal'],
        dinner: ['roti', 'veg(seasonal)']
      },
      "tuesday": {
        breakfast: ['daliya'],
        lunch: ['jira rice', 'dal', 'mix veg'],
        dinner: ['roti', 'matar paneer', 'kheer']
      },
      "wednesday": {
        breakfast: ['poha'],
        lunch: ['rice', 'aloo palak', 'dal'],
        dinner: ['roti', 'veg(seasonal)']
      },
      "thursday": {
        breakfast: ['daliya'],
        lunch: ['jira rice', 'dal', 'mix veg'],
        dinner: ['roti', 'matar paneer', 'kheer']
      },
      "friday": {
        breakfast: ['poha'],
        lunch: ['rice', 'aloo palak', 'dal'],
        dinner: ['roti', 'veg(seasonal)']
      },
      "saturday": {
        breakfast: ['daliya'],
        lunch: ['jira rice', 'dal', 'mix veg'],
        dinner: ['roti', 'matar paneer', 'kheer']
      },
      "sunday": {
        brunch: ['pudi', 'chhole'],
        dinner: ['roti', 'veg(seasonal)']
      }
    });
    newMenu.save((err, menu) => {
      if (err) return res.json({ message: 'Could not get menu' })
      res.json({
        menu: menu,
        message: 'item menu is found'
      })
    });
  }
}