const express = require("express");
const bootStrapped = require('../bootstrap/bootstrap')
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/', (req, res) => {
  res.json({
    message: "welcome"
  });
});


router.post('/login', userController.loginUser);
router.get('/verify', userController.verifyUser);

router.use('/student', require('./student'));
router.use('/staff', require('./staff'));
router.use('/admin', require('./admin'));


//bootstrapped
// router.get('/createmenuboot', (req, res) => {
//   bootStrapped.createMenu()
// });

router.get('/createbufferboot', (req, res) => {
  bootStrapped.createBuffer(10);
});


module.exports = router;
