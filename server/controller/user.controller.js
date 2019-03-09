const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const FeedBack = require("../model/Feedback");
const Student = require("../model/Student");
const Invite = require("../model/Invite");
 

module.exports = {
  getStudent: (req, res, next) => {
    res.json({
      message: "welcome student"
    });
  },

  registerStudent: (req, res, next) => {

    const { email, password, name, refCode } = req.body;
  console.log("register stud back",email,password,refCode);
  
    Invite.findOne({ refCode: refCode }, (err, user) => {
      console.log(user)
      if (err) res.json({ message: "not verified" });
      if (user.isVerified ) {
        const newStudent = new Student({
          name,
          email,
          password
        });
        
        // console.log(name,email)

        console.log(newStudent,'newstud')

        
        newStudent.save((err, user) => {

          console.log(user,'new')
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
    res.json({
      message: "profile"
    });
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
    // smtpTransport initialization
    const smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "food.altcampus@gmail.com",
        pass: "Altcampus@2018"
      }
    });
    
    let rand, mailOptions, host, link;  
    // generate random ref code
    function randomN(v) {
      let rand = [];
      let alphaNum = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for(let i = 0 ;i < v;i++){
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
    console.log(refCode)
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
    console.log(ref);
    // if (`${req.protocol}://${req.get("host")}` == `http://${host}`) {
      Invite.findOneAndUpdate(
        { refCode: ref },
        { $set: { isVerified: true } },
        (err, code) => {
          if (err) res.json({ msg: `you're link is expired` });
          res.json({

            emailId : code.emailId,
            refCode: code.refCode,
            // msg: `Email ${mailOptions.to} is successfully verified.`
          });
        }
      );
    }
  // }
};
