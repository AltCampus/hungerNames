const Attendance = require('../model/attendanceBuffer'); 
const Feedback = require('../model/Feedback');
const Student = require('../model/Student');


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
    let d = "2019-03-13T11:40:08.743Z"
   Feedback.find({date:{$lt: d}})
   .populate("student")
   .exec((err,feedback) => {
    //  student.forEach((c)=> {
    //    console.log(c.student.name)
    //  })
     res.json({
       feedback
     })
   })
}
}