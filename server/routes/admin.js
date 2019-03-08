const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin.controller');

router.get('/', adminController.getAdmiin);
router.post('/login',adminController.loginAdmin);
router.get('/verify',adminController.verifyAdmin);
router.post('login/forget',adminController.forgetPassword);
router.get('/student',adminController.getAllStudents);


module.exports = router;