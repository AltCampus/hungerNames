const mongoose = require('mongoose');
const FeedBack = require('../model/Feedback');
const Student = require('../model/Students');

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
   
  //  console.log(studentFeedback)
  //  console.log(studentId)
    const feedBack = new FeedBack({
      
    })

    res.json({
      message: 'feedback'
    })
  }
}