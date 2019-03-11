const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const adminController = require('../controller/admin.controller');
const isUser = require('../config/auth');


// inviting student at this route
router.post('/invite', userController.inviteStudent);
router.get('/verify',userController.verifyStudent)
router.get('/',  isUser.isLoggedIn,userController.getStudent);
router.post('/register',userController.registerStudent);
router.post('/login',userController.loginUser);
router.get('/logout',userController.logoutStudent);
router.get('/profile/:id', userController.profileStudent);
router.put('/:id/:day',userController.attendanceStudent);
router.post('/:id/feedback',userController.feedbackStudent);

// removing a particular student
router.delete('/:id', adminController.removeStudent);

module.exports = router;
