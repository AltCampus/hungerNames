const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin.controller');

router.get('/', adminController.getAdmiin);
router.post('/login',adminController.loginAdmin);
router.get('/verify',adminController.verifyAdmin);
router.post('login/forget',adminController.forgetPassword);

// Adding menu
router.post('/menu', adminController.addMenu);

module.exports = router;