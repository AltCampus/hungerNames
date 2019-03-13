const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const adminController = require('../controller/admin.controller');
const isUser = require('../config/auth');


// inviting student at this route
router.post('/invite', userController.inviteStudent);
router.get('/verify',userController.verifyStudent)
router.post('/register',userController.registerStudent);
// router.post('/login',userController.loginStudent);
router.get('/logout',userController.logoutStudent);
router.get('/profile/:id',isUser.isLoggedIn, userController.profileStudent);
router.put('/:id/:day',isUser.isLoggedIn,userController.attendanceStudent);
router.post('/:id/feedback',isUser.isLoggedIn,userController.postFeedbackStudent);
router.get('/:id/feedback',isUser.isLoggedIn,userController.getAllFeedback);

//admin get all students
router.get('/',isUser.isLoggedIn,adminController.getStudent);
// removing a particular student
router.delete('/:id',isUser.isLoggedIn, adminController.removeStudent);

module.exports = router;
