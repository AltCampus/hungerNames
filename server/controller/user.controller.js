const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const FeedBack = require("../model/Feedback");
const User = require("../model/User");
const Invite = require("../model/Invite");

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// async let account = await nodemailer.createTestAccount();

/*
  Here we are configuring our SMTP Server details.
  STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "food.altcampus@gmail.com",
    pass: "Altcampus@2018"
  }
});

// SMTP TRANSPORT ENDS HERE

var rand, mailOptions, host, link;    //Figure out a way to remove global variables 

module.exports = {
  getStudent: (req, res, next) => {
    res.json({
      message: "welcome student"
    });
  },
  registerStudent: (req, res, next) => {
    const { email, password, name, refCode } = req.body;
    Invite.findOne({ refCode }, (err, user) => {
      if (err) return res.status(401).json({ error: "not verified" });
      if (user.isVerified && user.email == email) {
        const newStudent = new User({
          name,
          email,
          password
        });
        newStudent.save((err, user) => {
          if (err) return res.status(400).json({
              message: "user is not found"
            });
          res.json({
            message: "registered",
            email: user.email,
            name: user.name
          });
        });
      } else return res.json({ error: 'Please, verify your email' })
    });
  },
  loginStudent: (req, res, next) => {
    console.log(req.body, 'inside login student');
    const { email, password } = req.body;
    if (!email && !password) return res.status(451).json({ error: 'Email or Password is required' })
    passport.authenticate('local', { failureRedirect: '/login' }, { session: false }, (err, user) => {
      if (err) return res.status(500).json({ error: 'Internal server error' })
      const token = jwt.sign({ user: req.user }, 'secret');
      console.log(token);
      res.json({
        message: "successfully logged in",
        token: token
      });
    })
  },
  logoutStudent: (req, res, next) => {
    res.json({
      message: "logged out"
    });
  },
  profileStudent: (req, res, next) => {
    // const {id} = req.params
    // Student.findOne({_id: id})
    // console.log(id);
    res.json({
      message: "profile"
    });
  },
  attendanceStudent: (req, res, next) => {
    const { day } = req.params;
    console.log(day);
    res.json({
      message: "attendance"
    });
  },
  feedbackStudent: (req, res, next) => {
    const studentId = req.params.id;
    const { feedbackTitle } = req.body;
    console.log(req.body);

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
    // generating random number for refCode
    function randomN(v) {
      let rand = "";
      let alphaNum = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for(let i = 0 ;i < v;i++){
        let random = Math.floor(Math.random() * 36);
        rand.concat(alphaNum[random])
      }
      return rand;
    }

    function checkFefCode(refCode) {
      Invite.find({ refCode }, (err, data) => {
        if(!err){
          if (data.length) return false;
          else return true 
        } return false
    })
    }

    // it'll provide your localhost or network address
    host = req.get("host");
    let flag = false;
    let refCode = null;
    
    while(!flag){
      refCode = randomN(10);
      flag = checkFefCode(refCode)
    }

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
    console.log(req.body,"verify");
    const refId = req.query.ref;
    console.log('ref verify',refId)
    console.log(`${req.protocol}://${req.get("host")}` , `http://${host}`);
    // if (`${req.protocol}://${req.get("host")}` == `http://${host}`) {
      console.log("Domain is matched. Information is from Authenticate email");
      Invite.findOneAndUpdate(
        { refCode: refId },
        { $set: { isVerified: true } },
        (err, code) => {
          if (err) return res.status(503).json({ error: `you're link is expired` });
          res.json({
            emailId: code.emailId,
            refCode: code.refCode,
            // msg: `Email ${mailOptions.to} is successfully verified.`
          });
        }
      );
    }
  // }
};
