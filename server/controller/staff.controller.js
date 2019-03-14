const Attendance = require('../model/attendanceBuffer'); 
const Feedback = require('../model/Feedback');
const Student = require('../model/Student');
const serverUtils = require('../serverUtils/index')


module.exports = {
  getStaff: (req,res,next) => {
    res.json({
      message: 'welcome satff'
    })
  },
  getAllStudentAttendance: (req, res , next) => {
    console.log(req)
  },
  getAllStudentFeedback: (req, res, next) => {
    let today = new Date();
    let todayMinus2 = new Date();
    todayMinus2 = serverUtils.removeTimeFromDate(todayMinus2);
    todayMinus2.setDate(today.getDate() - 2);
   Feedback.find({date:{$gte:todayMinus2, $lt: today}})
   .populate("student")
   .exec((err,feedback) => {
    let filteredFeedback =[];
    feedback.forEach((feed) => {
      let obj = {}
      obj.name = feed.student.name;
      obj.meal = feed.meal;
      obj.mealType = feed.mealType;
      obj.review = feed.review;
      obj.rating = feed.rating;
      obj.date = feed.date;
      filteredFeedback.push(obj)
    })
     res.json({
       feedback: filteredFeedback
     })
   })
}
}