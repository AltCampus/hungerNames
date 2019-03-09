const passport = require('passport');
const jwt = require('jsonwebtoken');
const Student = require("../model/Student");
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
  getAllStudents: (req, res, next) => {
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