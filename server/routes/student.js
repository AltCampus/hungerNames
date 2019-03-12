const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const adminController = require('../controller/admin.controller');
const isUser = require('../config/auth');


// inviting student at this route
router.post('/invite', userController.inviteStudent);
router.get('/verify',userController.verifyStudent)
router.post('/register',userController.registerStudent);
router.post('/login',userController.loginStudent);
router.get('/logout',userController.logoutStudent);
router.get('/profile/:id', userController.profileStudent);
router.put('/:id/:day',userController.attendanceStudent);
router.post('/:id/feedback',userController.feedbackStudent);

//admin get all students
router.get('/',adminController.getStudent);
// removing a particular student
router.delete('/:id', adminController.removeStudent);

module.exports = router;

// use this auth middleware for protecting routes
// isUser.isLoggedIn