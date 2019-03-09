const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require("../model/User");
const Menu = require("../model/Menu");

module.exports = {
  getAdmin: (req, res, next) => {
    res.json({
      message: 'welcome admin'
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
  getAllStudents: (req, res, next) => {
    User.aggregate([ {$match: { isAdmin : false, isKitchenStaff: false}}, 
      {$group: {_id: "Students List" , students : { $push: { id: "$_id", name:
    "$name",email: "$email" }}}}],(err,user) => {
      console.log(user)
       if(err) return res.json({message:'coulnt fetch'});
       res.json({
          user:user[0].students
       })
     })
},
  addMenu: (req, res, next) => {
    
    const newMenu = new Menu({
      menu: {
        day1: {
          day: 'monday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day2: {
          day: 'tuesday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day3: {
          day: 'wednesday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day4: {
          day: 'thursday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day5: {
          day: 'friday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day6: {
          day: 'saturday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day7: {
          day: 'sunday',
          meal: {
            brunch: {
              title: 'poha',              
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        }
      }
    });

    // newMenu.save( function(err, menu) {
    //   if(err) { return next(err); }
    //   console.log(menu);
    // })

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