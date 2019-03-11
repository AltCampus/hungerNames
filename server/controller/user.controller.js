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

  loginStudent: (req, res, next) => {
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
        })
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

  feedbackStudent: (req, res, next) => {
    const studentId = req.params.id;
    const { feedbackTitle } = req.body;

    // Save the feedback first then get the _id of that feedback

    const feedBack = new FeedBack({
      ...req.body
    });

    //  feedBack.save((err, feedBack) => {
    //    const feedbacId =  feedBack._id;
    //    Student.findByIdAndUpdate(studentId, {$push: {feeback: feedbacId}, {upsert: true}})
    //  })

    // Getting all the feedback related to particular student
    User.findOne({ _id: studentId })
      .populate("feedback")
      .exec((err, student) => {});

    //  console.log(studentFeedback)
    //  console.log(studentId)

    res.json({
      message: "feedback"
    });
  },

  inviteStudent: (req, res, next) => {
    // smtpTransport initialization
    const smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
      }
    });

    let mailOptions, host, link;
    // generate random ref code
    function randomN(v) {
      let rand = [];
      let alphaNum = "abcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < v; i++) {
        let random = Math.floor(Math.random() * 36);
        rand.push(alphaNum[random]);
      }
      return rand.join("");
    }
    // Have to check if ref generated is unique all the time from database
    // it'll provide your localhost or network address
    host = req.get("host");
    let refCode;
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
