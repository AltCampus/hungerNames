const AttendanceBufferSchema = require('../model/attendanceBuffer')
const Feedback = require("../model/Feedback");
const Student = require("../model/Student");
const serverUtils = require("../serverUtils/index");

module.exports = {
  getStaff: (req, res, next) => {
    res.json({
      message: "welcome satff"
    });
  },

  getAllStudentAttendance: (req, res, next) => {
    console.log(req);
  },

  getAllStudentFeedback: (req, res, next) => {
    let today = new Date();
    let todayMinus2 = new Date();
    todayMinus2 = serverUtils.removeTimeFromDate(todayMinus2);
    todayMinus2.setDate(today.getDate() - 2);
    Feedback.find({ date: { $gte: todayMinus2, $lte: today } })
      .populate("student")
      .exec((err, feedback) => {
        if(err) return res.json({message:'not able to fetch'})
        let filteredFeedback = [];
        feedback.forEach(feed => {
          let obj = {};
          obj.name = feed.student.name;
          obj.meal = feed.meal;
          obj.mealType = feed.mealType;
          obj.review = feed.review;
          obj.rating = feed.rating;
          obj.date = new Date(feed.date).toDateString()
          filteredFeedback.push(obj);
        });
        res.json({
          feedback: filteredFeedback
        });
      });
  },

  addRemarkStaff: (req, res, next) => { 
    console.log('indone') 
    console.log(req.body)
    const {mealtype,date,remark} = req.body
    // let mealType = breakfast
    let remarks = 'remarks';
    let breakfast = `breakfast.${remarks}`
    let dat = '2019-03-13T11:40:08.743+00:00'
    // AttendanceBufferSchema.find({date : '2019-04-27T18:30:00.000+00:00'},(err,data) => {
    //   res.json({
    //     data
    //   })
    // })
    AttendanceBufferSchema.findOneAndUpdate({ date : dat},{$set:{[breakfast]:"sdds"}},{new: true},(err,doc) => {
   res.json({
     doc
   })
    })
  }

}