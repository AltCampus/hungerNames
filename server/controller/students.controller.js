const mongoose = require('mongoose');
const FeedBack = require('../model/Feedback');
const Student = require('../model/Students');
const Invite = require('../model/Invite');

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
    console.log(id);
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
   Student.findOne({_id : studentId})
    .populate('feedback')
    .exec((err, student) => {
      
    })


  //  console.log(studentFeedback)
  //  console.log(studentId)
      

    res.json({
      message: 'feedback'
    })
  },
  verifyStudent: (req,res,next) => {
    // parse he url for verify token
    // req.body will content referral token
    // query for token in admin model and verify it
//     console.log(req.query.id);
//     const refId = req.query.id
//     Invite.findOne({  refCode : refId},(err,user) => {
//       if (err) return res.json({ message:'not invited'});
//      .findOneAndUpdate({

//       })
//     }) 
  }
}