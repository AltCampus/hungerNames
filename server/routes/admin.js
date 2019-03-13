const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin.controller');

router.get('/', adminController.getAdmin);
// router.post('/login',adminController.loginAdmin);

router.post('login/forget',adminController.forgetPassword);

// getting menu from db
router.get('/menu', adminController.getMenuList);

// Updating menu
router.put('/menu', adminController.updateMenu);

module.exports = router;