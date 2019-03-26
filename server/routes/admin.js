const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin.controller');
const isUser = require('../config/auth');

// router.get('/', adminController.getAdmin);
// router.post('/login',adminController.loginAdmin);

router.post('login/forget',adminController.forgetPassword);

// Adding menu
router.get('/menu', adminController.getMenuList);

// Updating menu
router.put('/menu', adminController.updateMenu);

module.exports = router;