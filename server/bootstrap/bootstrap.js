const serverUtil = require('../serverUtils');
function createMenu() {
  const Menu = require("../model/Menu");
  const newMenu = new Menu({
    menu: {
      day0: {
        day: 'sunday',
        meal: {
          brunch: {
            title: 'poha',
          },
          dinner: {
            title: 'roti veg(seasonal)'
          }
        }
      },
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
    }
  });

  newMenu.save(function (err, menu) {
    if (err) { return next(err); }
  })
}

function createBuffer(n) {  
  const AttendanceBuffer = require("../model/attendanceBuffer");
  const Students = require('../model/Student')

  Students.find({ isAdmin: false, isKitchenStaff: false }, { _id: 1 }, (err, data) => {
    if (!err) {      
      var studentArr = data.reduce((acc, v) => {
        let newObj = {};
        newObj.student = v._id;
        acc.push(newObj);
        return acc;
      }, []);      
      let today = new Date();
      let todayDay = today.getDay();
    
      //now do date loop and bootstrap attBuffer
      for (i = -todayDay; i <= n; i++) {
        const newAttendanceBuffer = new AttendanceBuffer({
          date: serverUtil.convDateToDateStr(serverUtil.dateManupulater(i)),
          breakfast: {
            //still have to make it automatic according to menu 
            title: "poha",
            attendance: studentArr,
          },
          brunch: {
            title: "chola/puri",
            attendance: studentArr,
          },
          lunch: {
            title: "dal aur chawal",
            attendance: studentArr,
          },
          dinner: {
            title: "sabzi aur roti",
            attendance: studentArr,
          },
        })
        newAttendanceBuffer.save(function (err, menu) {
          if (err) { return next(err); }          
        })
      }
    }
  })
}

module.exports = {
  createMenu,
  createBuffer,
}
