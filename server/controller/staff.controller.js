const AttendanceBufferSchema = require("../model/attendanceBuffer");
const Feedback = require("../model/Feedback") 
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

  getAllStudentFeedback:(req, res, next) => {
    let today = new Date();
    let todayMinus2 = new Date();
    todayMinus2.setDate(today.getDate() - 2);
    let dateStringToday = serverUtils.convDateToDateStr(today)
    let dateStringMinus2 = serverUtils.convDateToDateStr(todayMinus2);
    Feedback.find({ date: {$gte: dateStringMinus2, $lte: dateStringToday}  })
      .populate("student")
      .exec((err, feedback) => {
        console.log(feedback,'feedback')
        if (err) return res.json({ message: "not able to fetch" });
        let filteredFeedback = [];
        console.log(filteredFeedback)
        feedback.forEach(feed => {
          console.log(feed);
          let obj = {};
          obj.name = (feed.student) ? feed.student.name : null ;
          obj.meal = feed.meal;
          obj.mealType = feed.mealType;
          obj.review = feed.review;
          obj.rating = feed.rating;
          obj.date = new Date(feed.date).toDateString();
          filteredFeedback.push(obj);
          console.log(filteredFeedback)
        });
        console.log(filteredFeedback)
        res.json({
          feedback: filteredFeedback
        });
      });
  },

  addRemarkStaff: (req, res, next) => {
    const { mealtype, date, remark } = req.body;
    let newDate = date;
    console.log(newDate)
    let remarks = `${remark}`;
    let mealType = `${mealtype}.remarks`;
    AttendanceBufferSchema.findOneAndUpdate(
      { date: newDate },
      { $set: { [mealType]: [remarks] }},{new: true}  ,
      (err, doc) => {
        if (err) return res.json({
          error: 'Remark not sent, please retry.'
        })
        return res.json({
          message: 'Remark has been sent successfully.'
        })
      }
    );
    // const att = new AttendanceBufferSchema({
    //   date: '2019-04-05',
    //   breakfast: {
    //     title: "idli",
    //   },
    //   lunch : {
    //     title: 'samar'
    //   },
    //   dinner: {
    //     title: 'rice curd'
    //   }
    // })
    // att.save((err,done) => {
    //   if (err) console.log(err)
    //   console.log(done)
    // })
    }
}
