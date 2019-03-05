const express = require("express");
const router = express.Router();
const studentController = require('../controller/students.controller');

router.get("/", studentController.getStudent);
router.post('/register',studentController.registerStudent);
router.post('/login',studentController.loginStudent);
router.get('/logout',studentController.logoutStudent);
router.get('/:id',studentController.profileStudent);
router.put('/:id/:day',studentController.attendanceStudent);
router.post('/:id/feedback',studentController.feedbackStudent);

module.exports = router;
