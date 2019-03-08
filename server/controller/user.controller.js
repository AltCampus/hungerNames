const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const passport = require("passport");
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

var rand, mailOptions, host, link;

module.exports = {
  getStudent: (req, res, next) => {
    res.json({
      message: "welcome student"
    });
  },
  registerStudent: (req, res, next) => {
    const { email, password, name, refCode } = req.body;
    Invite.findOne({ refCode }, (err, user) => {
      if (err) res.json({ message: "not verified" });
      if (user.isVerified) {
        const newStudent = new User({
          name,
          email,
          password
        });
        newStudent.save((err, user) => {
          if (err)
            res.status(401).json({
              message: "user is not found"
            });
          res.json({
            message: "registered",
            email: user.email,
            name: user.name
          });
        });
      } else return res.json({ message: "Please, verify your email" });
    });
  },
  loginStudent: (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password)
      res.json({ message: "Email or Password is required" });
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
      const token = jwt.sign({ user: req.user }, "secret");
      res.json({
        message: "successfully logged in",
        token: token
      });
    });
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
      message: "attendace"
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
      let alpha;
      rand = Math.floor(Math.random() * 100 + v);
      alpha = String.fromCharCode(rand);
      return rand + alpha + (rand - 50);
    }

    // it'll provide your localhost or network address
    host = req.get("host");
    const refCode = randomN(10);
    link = `http://${host}/register?ref=${refCode}`;
    const email = req.body.email;

    mailOptions = {
      to: email,
      subject: "Verify your email",
      html: `Hello, <br>Please click on <a href='${link}'>click here</a> to verify your email.`
    };

    // send mail with defined transport object(mailOptions)
    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) return res.json({ msg: "Message could not send" });
      else {
        const newInvite = new Invite({
          emailId: email,
          refCode
        });
        newInvite.save(err => {
          if (!err) res.json({ msg: `Message sent to ${mailOptions.to}` });
        });
      }
    });
  },
  verifyStudent: (req, res, next) => {
    console.log(req.body);
    const refId = req.query.ref;
    if (`${req.protocol}://${req.get("host")}` == `http://${host}`) {
      console.log("Domain is matched. Information is from Authenticate email");
      Invite.findOneAndUpdate(
        { refCode: refId },
        { $set: { isVerified: true } },
        (err, code) => {
          if (err) res.json({ msg: `you're link is expired` });
          res.json({
            emailId: code.emailId,
            refCode: code.refCode,
            msg: `Email ${mailOptions.to} is successfully verified.`
          });
        }
      );
    }
  }
};
