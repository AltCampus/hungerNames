const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const adminController = require('../controller/admin.controller');
const staffController = require('../controller/staff.controller');
const isUser = require('../config/auth');

// student routes
router.get('/verify', userController.verifyStudent)
router.post('/register', userController.registerStudent);
router.get('/logout', userController.logoutStudent);
router.get('/profile/:id',userController.profileStudent);
router.put('/:id/:day', userController.attendanceStudent);
router.post('/:id/feedback',userController.postFeedbackStudent);
router.get('/:id/feedback', userController.getFeedback);
router.get('/attendance', userController.getUserAttendence);
router.put('/attendance', userController.updateUserAttendence);

router.get('/attendees', userController.getAttendees);

//admin handle student route
router.post('/invite', adminController.inviteStudent);

// removed router auth middleware for getting list of students
router.get('/', adminController.getStudent);
router.delete('/:id/delete', adminController.removeStudent);

//staff handle student route
router.get('/attendees', staffController.getAllStudentAttendance);
router.get('/feedback', staffController.getAllStudentFeedback);


module.exports = router;
