const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const FeedBack = require('../model/Feedback');
const User = require('../model/User');
const Invite = require('../model/Invite');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// async let account = await nodemailer.createTestAccount();

/*
  Here we are configuring our SMTP Server details.
  STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'food.altcampus@gmail.com',
    pass: 'Altcampus@2018'
  }
});

// SMTP TRANSPORT ENDS HERE

var rand, mailOptions, host, link;

module.exports = {
  getStudent: (req,res,next) => {
    res.json({
      message: 'welcome student'
    })
  },
  registerStudent: (req,res,next) => {
    res.json({
      message: 'register page'
    })
  },
  loginStudent: (req,res,next) => {
    res.json({
      message: 'login page'
    })
  },
  logoutStudent: (req,res,next) => {
    res.json({
      message: 'logged out'
    })
  },
  profileStudent: (req,res,next) => {
    // const {id} = req.params
    // Student.findOne({_id: id})
    // console.log(id);
    res.json({
      message: 'profile'
    })
  },
  attendanceStudent: (req,res,next) => {
    const {day} = req.params;
    console.log(day);
    res.json({
      message: 'attendace'
    })
  },
  feedbackStudent: (req,res,next) => {
   const studentId = req.params.id;
   const { feedbackTitle } = req.body;
   console.log(req.body);
 
   // Save the feedback first then get the _id of that feedback
   const feedBack = new FeedBack({
     ...req.body,
   });

  //  feedBack.save((err, feedBack) => {
  //    const feedbacId =  feedBack._id;
  //    Student.findByIdAndUpdate(studentId, {$push: {feeback: feedbacId}, {upsert: true}})
  //  })

   // Getting all the feedback related to particular student
   User.findOne({_id : studentId})
    .populate('feedback')
    .exec((err, student) => {
      
    })


  //  console.log(studentFeedback)
  //  console.log(studentId)
      

    res.json({
      message: 'feedback'
    })
  },

  inviteStudent: (req, res, next) => {

    // generating random number for refCode
    function randomN(v) {
      let alpha;
      rand = Math.floor((Math.random() * 100) + v);
      alpha = String.fromCharCode(rand)
      return rand + alpha + (rand - 50)
    }

    // it'll provide your localhost or network address
    host = req.get('host');

    link = `http://${host}/api/v1/student/verify?ref=${randomN(10)}`
    const email = req.body.email;

    mailOptions = {
      to: email,
      subject: 'Verify your email',
      html: `Hello, <br>Please click on <a href='${link}'>click here</a> to verify your email.`
    }

    // send mail with defined transport object(mailOptions)
    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) return res.json({ msg: 'Message could not send' });
      res.json({ msg: `Message sent to ${mailOptions.to}` });
    })
  },
  verifyStudent: (req,res,next) => {
    console.log(req.query, 'inside verify student');
    if ((`${req.protocol}://${req.get('host')}`) == (`http://${host}`)) {
      console.log('Domain is matched. Information is from Authenticate email');
      if (req.query.ref == rand) {
        console.log('email is verified.');
        res.json({ msg: `Email ${mailOptions.to} is successfully verified.` });
      } else {
        console.log('email is not verified.');
        res.json({ msg: `Bad Request` });
      }
    } else {
      res.json({ msg: `Request is from unknown source.` });
    }
  }
}