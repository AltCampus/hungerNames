const express = require("express");
const bootStrapped = require('../bootstrap/bootstrap')
const router = express.Router();
const userController = require('../controller/user.controller');
const adminController = require('../controller/admin.controller');

router.get('/', (req, res) => {
  res.json({
    message: "welcome"
  });
});


router.post('/login', userController.loginUser);
router.get('/verify', userController.verifyUser);

// posting email for reset password at this route
router.post('/forgotpassword', adminController.forgotPassword);

router.get('/resetpassword', adminController.verifyResetPassword);

router.post('/resetpassword', adminController.resetPassword);

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
