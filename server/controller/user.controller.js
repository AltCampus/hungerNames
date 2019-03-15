const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const FeedBack = require("../model/Feedback");
const Student = require("../model/Student");
const Invite = require("../model/Invite");
const serverUtils = require('../serverUtils/index')
 

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
      if (user.isVerified ) {
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
    }, (err, f_user, info) => {
      const user = serverUtils.cleanUser(f_user);
      if(err) return res.json({error: 'not verified'})
      const token = jwt.sign({
        user: user._id
      }, 'secret');
      console.log('sending token');
      
      let userP = serverUtils.cleanUser(admin);
      res.json({
        message: "successfully logged in",
        token,
        userP
      });
    });
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
          // TODO: If no `code` , apply condition    
          res.json({
            emailId : code.emailId || '',
            refCode: code.refCode || '',
            // msg: `Email ${mailOptions.to} is successfully verified.`
          });
        }
      );
    }
  // }
};
