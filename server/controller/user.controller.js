const mongoose = require("mongoose");
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
      if (err) res.json({ message: "not verified" });
      if (user.isVerified) {
        const newStudent = new Student({
          name,
          email,
          password
        });

        // console.log(name,email)

        newStudent.save((err, user) => {

          if (err || !user) {
            return res.status(401).json({
              error: "user is not found"
            });

          }
          res.json({
            message: "registered",
            name: user.name
          });
        });
      } else return res.json({ message: "Please, verify your email" });
    });
  },

  loginUser: (req, res, next) => {
    passport.authenticate('local', {
      session: false
    }, (err, data, info) => {
      const user = serverUtils.cleanUser(data);
      if (err) return res.json({ error: 'not verified' })
      const token = jwt.sign({
        user
      }, 'secret');
      console.log('sending token');
      res.json({
        message: "successfully logged in",
        token,
        user
      });
    });
  },

  logoutStudent: (req, res, next) => {
    res.json({
      message: "logged out"
    });
  },

  profileStudent: (req, res, next) => {
    const studentId = req.params.id;
    Student.findById({ _id: studentId }, (err, user) => {
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

  postFeedback: (req, res, next) => {
    const studentId = req.params.id;
    const feedbackBody = req.body;
    const feedBack = new FeedBack({
      student: studentId,
      ...feedbackBody
    });
    feedBack.save((err, feedback) => {
      if (err) return res.json({ error: 'internal error' })
      Student.findOneAndUpdate({ _id: studentId }, { $push: { feedback: feedback._id } }, { upsert: true }, (err, student) => {
        if (err) return res.json({
          error: 'sorry mate youre not found'
        })
        const { name, email, _id } = student
        res.json({
          student: {
            _id,
            name,
            email
          }
        })
      })
    })
  },

  getFeedback: (req, res, next) => {
    const studentId = req.params.id;
    Student.findOne({ _id: studentId })
      .populate("feedback")
      .exec((err, student) => {
        const { feedback, _id, name, email } = student
        if (err) return res.json({ error: "server busy" })
        if (feedback.length === 0) return res, json({
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

  inviteStudent: (req, res, next) => {
    // smtpTransport initialization
    const smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: 'food.altcampus@gmail.com',
        pass: 'Altcampus@2018'
      }
    });

    let rand, mailOptions, host, link;
    // generate random ref code
    function randomN(v) {
      let rand = [];
      let alphaNum = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < v; i++) {
        let random = Math.floor(Math.random() * 36);
        rand.push(alphaNum[random])
      }
      return rand.join('');
    }
    // it'll provide your localhost or network address
    host = req.get("host");
    let refCode;

    // while(!flag){
    refCode = randomN(6);
    link = `http://${host}/register?ref=${refCode}`;
    const email = req.body.email;
    mailOptions = {
      to: email,
      subject: "Verify your email",
      html: `Hello, <br>Please click on <a href='${link}'>click here</a> to verify your email.`
    };
    // send mail with defined transport object(mailOptions)
    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(406).json({ error: "Message could not send" });
      else {
        const newInvite = new Invite({
          emailId: email,
          refCode
        });
        newInvite.save(err => {
          if (!err) res.json({ message: `Message sent to ${mailOptions.to}` });
        });
      }
    });
  },

  verifyStudent: (req, res, next) => {
    // console.log(req.query.ref)
    const { ref } = req.query;
    // if (`${req.protocol}://${req.get("host")}` == `http://${host}`) {
    Invite.findOneAndUpdate(
      { refCode: ref },
      { $set: { isVerified: true } },
      (err, code) => {
        if (err) res.json({ msg: `you're link is expired` });
        if (code) {
          res.json({
            emailId: code.emailId,
            refCode: code.refCode,
            // msg: `Email ${mailOptions.to} is successfully verified.`
          });
        } else res.json({ error: "cant find user" })
      }
    );
  },
  // }
  //Attendance Controller for user

  getUserAttendence: (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.json({ message: 'unAuthorized Student' });
    const headerToken = token.split(' ')[1];
    const user = serverUtils.getUserFromToken(headerToken);
    if (!user) return res.json({ error: `user not found` })
    let today = new Date();
    let todayDay = today.getDay();
    let weekStart = serverUtils.dateManupulater(-todayDay);
    let weekEnd = serverUtils.dateManupulater((6 - todayDay));
    AttendanceBuffer.find({ date: { $gte: weekStart, $lte: weekEnd } }, (err, Att) => {
      if (err) return res.json({ err: `DB error ` })
      let userAttendence = [];
      Att.forEach(atte => {
        let obj = {
          date: atte.date,
          brunch: atte.brunch.attendance.some(objVal => (objVal.student == user._id)),
          breakfast: atte.breakfast.attendance.some(objVal => (objVal.student == user._id)),
          lunch: atte.lunch.attendance.some(objVal => (objVal.student == user._id)),
          dinner: atte.dinner.attendance.some(objVal => (objVal.student == user._id)),
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

  updateUserAttendence: (req, res) => {
    attendanceArr = req.body.attendance;
    date = req.body.date;
    const token = req.headers['authorization'];
    if (!token) return res.json({ message: 'unAuthorized Student' });
    const headerToken = token.split(' ')[1];
    const user = serverUtils.getUserFromToken(headerToken);
    if (!user) {
      return res.json({
        error: `user not Authorise`,
      })
    }
    AttendanceBuffer.findOne({ date: date }, (err, prevAtt) => {
      let currentAtt = prevAtt;
      let flag = false; //to check if doc chenged or not
      attendanceArr.forEach(attendence => {
        const mealType = attendanceArr.title.split('-')[1];
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
  }
};
