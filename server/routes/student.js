const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/verify?ref=:ref',userController.verifyStudent)

// inviting student at this route
router.post('/invite', userController.inviteStudent);
router.get('/', userController.getStudent);
router.post('/register',userController.registerStudent);
router.post('/login',userController.loginStudent);
router.get('/logout',userController.logoutStudent);
router.get('/:id',userController.profileStudent);
router.put('/:id/:day',userController.attendanceStudent);
router.post('/:id/feedback',userController.feedbackStudent);

module.exports = router;
