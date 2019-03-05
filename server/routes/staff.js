const express = require("express");
const router = express.Router();
const staffController = require('../controller/staff.controller');

router.get("/", staffController.getStaff);

module.exports = router;
