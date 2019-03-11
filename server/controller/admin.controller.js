const passport = require('passport');
const jwt = require('jsonwebtoken');
const Student = require("../model/Student");
const Menu = require("../model/Menu");

module.exports = {
  getAdmin: (req, res, next) => {
    res.json({
      message: 'welcome admin'
    })
  },
  // loginAdmin: (req, res, next) => {
  //   passport.authenticate('local', {
  //     session: false
  //   }, (err, admin, info) => {
  //     if (!admin.isAdmin) return res.status(417).json({
  //       error: 'Admin not found'
  //     })
  //     const token = jwt.sign({
  //       admin
  //     }, 'secret');
  //     res.json({
  //       message: "successfully logged in",
  //       token: token
  //     });
  //   })(req, res, next)
  // },

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
      menu: {
        "monday": {
          breakfast: {title: 'Poha'},
          lunch: {title: 'Rice Aaloo-Palak Dal'},
          dinner: {title: 'Roti Veg(seasonal)'}
        },
        "tuesday": {
          breakfast: {title: 'Daliya'},
          lunch: {title: 'Jeera rice Dal Mix Veg'},
          dinner: {title: 'Roti Matar-Panner Kheer'}
        },
        "wednesday": {
          breakfast: {title: 'Egg-Bhurji Bread'},
          lunch: {title: 'Razma Chawal'},
          dinner: {title: 'Roti Dal-Tadka Aaloo-Bhujia'}
        },
        "thursday": {
          breakfast: {title: 'Pav-Bhaji'},
          lunch: {title: 'Pulao Boondi-Raita'},
          dinner: {title: 'Roti Aaloo-Mutter'}
        },
        "friday": {
          breakfast: {title: 'Poha'},
          lunch: {title: 'Chhole Chawal'},
          dinner: {title: 'Roti Chicken/Veg'}
        },
        "saturday": {
          breakfast: {title: 'Aloo-Paratha Pickle'},
          lunch: {title: 'Rice Dal Veg(seasonal)'},
          dinner: {title: 'Roti Veg(Kala Chana and Aaloo)'}
        },
        "sunday": {
          brunch: {title: 'Poori Chhole'},
          dinner: {title: 'Roti Egg-Curry'}
        }
      }
    });

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
      console.log(req.body, 'inside updated Menu')
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