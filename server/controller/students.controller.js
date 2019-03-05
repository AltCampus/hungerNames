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
    res.json({
      message: 'feedback'
    })
  }
}