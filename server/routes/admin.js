const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin.controller');

router.get('/', adminController.getAdmiin);
router.post('/login',adminController.loginAdmin);
router.get('/verify',adminController.verifyAdmin);
router.post('login/forget',adminController.forgetPassword);
router.get('/student',adminController.getAllStudents);

// Adding menu
router.get('/menu', adminController.addMenu);

// Updating menu
router.put('/menu', adminController.updateMenu);

module.exports = router;