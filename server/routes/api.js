const express = require("express");
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/', (req, res) => {
  res.json({
    message: "welcome"
  });
});

// router.post('/login', userController.loginUser);

router.use('/student', require('./student'));
router.use('/staff', require('./staff'));
router.use('/admin', require('./admin'));
module.exports = router;
