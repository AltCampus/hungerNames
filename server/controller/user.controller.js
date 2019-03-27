const mongoose = require("mongoose");
const Menu = require("../model/Menu");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const FeedBack = require("../model/Feedback");
const Student = require("../model/Student");
const Invite = require("../model/Invite");
const serverUtils = require('../serverUtils/index')
const AttendanceBuffer = require('../model/attendanceBuffer');

module.exports = {
  getStudent: (req, res, next) => {
    res.json({
      message: "welcome student"
    });
  },

  registerStudent: (req, res, next) => {
    const { email, password, name, refCode } = req.body;
    Invite.findOne({ refCode: refCode }, (err, user) => {
      const { isAdmin, isStaff, isStudent } = user;
      if (err) res.json({ message: "not verified" });
      if (user.isVerified) {
        const newStudent = new Student({
          name,
          email,
          password,
          isAdmin,
          isStaff,
          isStudent
        });
        newStudent.save((err, user) => {
<<<<<<< HEAD
          console.log(user, 'inside register student');
=======
>>>>>>> 829056551abf814bea6388ad776cf487225b3477
          if (err || !user) {
            return res.status(401).json({
              error: "user is not found"
            });
          }
          res.json({
            message: "registered",
            name: user.name
          });

          // removing previous data when user clicks on new invite link
          Invite.findOneAndDelete({emailId: email}, (err) => {
            if (err) throw err;
          })
        });
      } else return res.json({ message: "Please, verify your email" });
    });
  },

  verifyUser: async (req, res, next) => {
    const oldToken = req.headers['authorization'];
    if (!oldToken) return res.json({ message: 'unAuthorized Student' });
    const headerToken = oldToken.split(' ')[1];
    const user = await serverUtils.getUserFromToken(headerToken)
    if (!user) return res.json({ error: 'not verified' })
    const token = jwt.sign({
      user
    }, 'secret');
    res.json({
      message: "successfully logged in",
      token,
      user
    });
  },

  loginUser: (req, res, next) => {
    passport.authenticate('local', {
      session: false
    }, (err, data, info) => {

      if (!data) return res.json({ error: 'Incorrect Password' })
      if (err) return res.json({ error: 'user not found' })
      else {
        const user = serverUtils.cleanUser(data);
        const token = jwt.sign({
          user
        }, 'secret');
        res.json({
          message: "successfully logged in",
          token,
          user
        });
      }
    })(req, res, next);
  },

  logoutStudent: (req, res, next) => {
    res.json({
      message: "logged out"
    });
  },

  profileStudent: (req, res, next) => {
    const studentId = req.params.id;
    Student.findById({ _id: studentId }, (err, user) => {
      if (!user) return res.json({ message: 'user not present' })
      if (err) res.status(401).json({
        message: 'user not found'
      })
      Menu.findOne({}, (err, menu) => {
        const { name, email, _id } = user;

        if (err) res.status(500).json({
          message: 'internal error'
        });
        res.status(200).json({
          menu: menu.menu,
          user: { name, email, _id }
        })
      })
    })
  },

  attendanceStudent: (req, res, next) => {
    const { day } = req.params;
    res.json({
      message: "attendance"
    });
  },

  // postFeedbackStudent: (req, res, next) => {
  //   const studentId = req.params.id;
  //   const feedbackBody = req.body;
  //   const feedBack = new FeedBack({
  //     student: studentId,
  //     ...feedbackBody
  //   });
  //   Student.findById((studentId), (err, user) => {
  //     if (err) return res.json({ error: 'db error' })
  //     if (!user) return res.json({ message: 'user not present' })
  //     feedBack.save((err, feedback) => {
  //       if (err) return res.json({ error: 'internal error' })
  //       Student.findByIdAndUpdate(studentId, { $push: { feedback: feedback._id } }, { upsert: true }, (err, student) => {
  //         if (err) return res.json({
  //           error: 'sorry mate youre not found'
  //         })
  //         const { name, email } = student
  //         res.json({
  //           name,
  //           email
  //         })
  //       })
  //     })
  //   })
  // },

  getFeedback: (req, res, next) => {
    const studentId = req.params.id;
    Student.findById({ _id: studentId }, (err, user) => {
      if (err) return res.json({ error: 'db tandoor' })
      if (!user) return res.json({ message: 'user not found' })
    })
      .populate("feedback")
      .exec((err, student) => {
        const { feedback, _id, name, email } = student
        if (err) return res.json({ error: "server busy" })
        if (feedback.length === 0) return res.json({
          message: 'not feedback to display'
        })
        res.json({
          student: {
            feedback,
            _id,
            name,
            email
          }
        })
      });
  },

  postFeedbackStudent: (req, res, next) => {
    const studentId = req.params.id;
    const feedbackBody = req.body;
    console.log(feedbackBody, 'body')
    const feedBack = new FeedBack({
      student: studentId,
      ...feedbackBody
    });
    Student.findById(studentId, (err, user) => {
      if (err) return res.json({ error: 'db error' })
      if (!user) return res.json({ message: 'user not present' })
      feedBack.save((err, feedback) => {
        if (err) return res.json({ error: 'internal error' })
        Student.findByIdAndUpdate(studentId, { $push: { feedback: feedback._id } }, { upsert: true }, (err, student) => {
          console.log(student, 'stu')
          if (err) return res.json({
            error: 'sorry mate youre not found'
          })

          console.log('ghhjjjguyf');

          // Sending Notification to Kitchen Staff
          const kitchenStaff = onlineUsers.filter(v => v.role === 'kitchenStaff')
          console.log(kitchenStaff, 'kitchenStaff');

          isPosted = true


          // io.on('connection', (socket) => {
          //   console.log(`${socket.id} is connected`)
          //   socket.to(kitchenStaff[0].socketId).emit('notification', `User added a feedback.`)
          // })

          // io.on('connection', (socket) => {
          //   console.log(socket.id);
          //   // socket.emit('notification', `User added a feedback.`)
          // })

          const { name, email } = student
          res.json({
            name,
            email
          })
        })
      })
    })
  },

  verifyStudent: (req, res, next) => {
    const ref = req.query.ref
    Invite.findOneAndUpdate(
      { refCode: ref },
      { $set: { isVerified: true } },
      (err, code) => {
        if (err || !code) return res.json({ error: `you're link is expired` });
        res.json({
          emailId: code.emailId,
          refCode: code.refCode
        });
      }
    );
  },

  getUserAttendence: async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.json({ message: 'unAuthorized Student' });
    const headerToken = token.split(' ')[1];
    const user = await serverUtils.getUserFromToken(headerToken);
    // console.log(user);
    if (!user) return res.json({ error: `user not found` })
    let today = new Date();
    let todayDay = today.getDay();
    let weekStart = serverUtils.convDateToDateStr(serverUtils.dateManupulater(-todayDay));
    let weekEnd = serverUtils.convDateToDateStr(serverUtils.dateManupulater((6 - todayDay)));
    AttendanceBuffer.find({ date: { $gte: weekStart, $lte: weekEnd } }, (err, Att) => {
      if (err) return res.json({ err: `DB error ` })
      let userAttendence = [];
      Att.forEach(atte => {
        let obj = {
          date: atte.date,
          brunch: [atte.brunch.attendance.some(objVal => (objVal.student == user._id)), atte.brunch.remarks],
          breakfast: [atte.breakfast.attendance.some(objVal => (objVal.student == user._id)), atte.breakfast.remarks],
          lunch: [atte.lunch.attendance.some(objVal => (objVal.student == user._id)), atte.lunch.remarks],
          dinner: [atte.dinner.attendance.some(objVal => (objVal.student == user._id)), atte.dinner.remarks],
        }
        userAttendence.push(obj);
      })
      if (userAttendence.length) {
        return res.json({
          attendance: userAttendence,
        })
      }
      res.json({ error: `DB ERROR` })
    });

  },

  updateUserAttendence: async (req, res) => {
    attendanceArr = req.body.attendance;
    date = req.body.date;

    const token = req.headers['authorization'];
    if (!token) return res.json({ message: 'unAuthorized Student' });
    const headerToken = token.split(' ')[1];
    const user = await serverUtils.getUserFromToken(headerToken);
    if (!user) {
      return res.json({
        error: `user not Authorise`,
      })
    }
    AttendanceBuffer.findOne({ date: date }, (err, prevAtt) => {
      // console.log(currentAtt, "currentAtttttttttttt")
      let currentAtt = prevAtt;
      let flag = false; //to check if doc chenged or not
      attendanceArr.forEach(attendence => {
        const mealType = attendence.mealType;
        const value = attendence.value;
        let index = -1;
        //c;heck if student present
        let currStudPresent = currentAtt[mealType].attendance.some((objVal, i) => {
          if (objVal.student == user._id) {
            index = i;
            return true
          };
          return false;
        })
        //pull if value = false and user already present
        if (currStudPresent) {
          if (!value) {
            currentAtt[mealType].attendance.splice(index, 1);
            flag = true;
          }
        } else {
          //push if value true and not already present
          if (value) {
            currentAtt[mealType].attendance.push({ student: user._id });
            flag = true;
          }
        }
      })
      if (flag) {
        currentAtt.save(function (err, saved) {
          if (!err) return res.json({
            message: `resource updated`
          })
          else {
            res.json({
              error: `error saving to db`
            })
          }
        });
      }
    })
  },

  getAttendees: (req, res) => {
    const today = serverUtils.convDateToDateStr(new Date());
    console.log(today, "hello")

    //find todays attendence
    AttendanceBuffer.findOne({ date: today })
      .populate([
        { path: 'brunch.attendance.student' }, { path: 'lunch.attendance.student' }, { path: 'dinner.attendance.student' }, { path: 'breakfast.attendance.student' }])
      .exec((err, data) => {
        if (err) return res.json({ error: "DB ERROR" })
        console.log(data, err, "inside");
        const breakfastAtt = data.breakfast.attendance.map(obj => (obj.student) ? obj.student.name : null);
        const brunchAtt = data.brunch.attendance.map(obj => (obj.student) ? obj.student.name : null);
        const lunchAtt = data.lunch.attendance.map(obj => (obj.student) ? obj.student.name : null);
        const dinnerAtt = data.dinner.attendance.map(obj => (obj.student) ? obj.student.name : null);
        const object = {
          date: today,
          breakfast: breakfastAtt,
          brunch: brunchAtt,
          lunch: lunchAtt,
          dinner: dinnerAtt,
        }
        res.json(object);
      })
  }

};
