const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const adminController = require('../controller/admin.controller');
const staffController = require('../controller/staff.controller');
const isUser = require('../config/auth');

// student routes
router.get('/verify',userController.verifyStudent)
router.post('/register',userController.registerStudent);
router.get('/logout',userController.logoutStudent);
router.get('/profile/:id',isUser.isLoggedIn, userController.profileStudent);
router.put('/:id/:day',isUser.isLoggedIn,userController.attendanceStudent);
router.post('/:id/feedback',userController.postFeedback);
router.get('/:id/feedback',userController.getFeedback);

//admin handle student route
router.post('/invite', adminController.inviteStudent);
router.get('/',isUser.isLoggedIn,adminController.getStudent);
router.delete('/:id',isUser.isLoggedIn, adminController.removeStudent);

//staff handle student route
router.get('/attendees',staffController.getAllStudentAttendance);
router.get('/feedback',staffController.getAllStudentFeedback);
module.exports = router;
