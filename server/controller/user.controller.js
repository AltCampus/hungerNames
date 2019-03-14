const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const FeedBack = require("../model/Feedback");
const Student = require("../model/Student");
const Invite = require("../model/Invite");
const Menu = require('../model/Menu');

module.exports = {

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
    }, (err, user, info) => {
      const { isAdmin, isKitchenStaff, _id, name, email} = user;
      if(err) return res.json({error: 'not verified'})
      const token = jwt.sign({
        user
      }, 'secret');
      res.json({
        token: token,
        user: {
          isAdmin,
          isKitchenStaff,
          _id,
          name,
          email
        },
        message: "successfully logged in",  
      });
    })(req, res, next)
  },

  logoutStudent: (req, res, next) => {
    res.json({
      message: "logged out"
    });
  },

  profileStudent: (req, res, next) => {
    const  studentId  = req.params.id;
    Student.findById({_id : studentId }, (err,user) => {
      if(err) res.status(401).json({
        message: 'user not found'
      })
      Menu.findOne({},(err,menu) => {
        const {name, email, _id} = user;
        
        if (err) res.status(500).json({
          message: 'internal error'
        }); 
        res.status(200).json({
          menu: menu.menu,
          user: {name,email,_id}
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
      student:studentId,
      ...feedbackBody
    });
     feedBack.save((err, feedback) => {
       if (err) return res.json({error:'internal error'})
       Student.findOneAndUpdate({_id : studentId}, {$push: {feedback: feedback._id}}, {upsert: true},(err, student) => {
         if (err) return res.json({
          error: 'sorry mate youre not found'
         })
         const { name,email,_id} = student
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
        const {feedback, _id, name, email} = student
        if(err) return res.json({error: "server busy"})
       if (feedback.length === 0) return res,json({
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

  verifyStudent: (req, res, next) => {
    const { ref } = req.query;
    Invite.findOneAndUpdate(
      { refCode: ref },
      { $set: { isVerified: true } },
      (err, code) => {
        if (err) res.json({ msg: `you're link is expired` });
        res.json({
          emailId: code.emailId,
          refCode: code.refCode
        });
      }
    );
  }
};
