const passport = require('passport');
const jwt = require('jsonwebtoken');
const Student = require("../model/Student");
const Menu = require("../model/Menu");
const User = require('../model/Student')
const nodemailer = require("nodemailer");
const Invite = require('../model/Invite');


module.exports = {
  inviteStudent: (req, res, next) => {
    console.log(req.body, 'in invite student');
    const smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: 'food.altcampus@gmail.com',
        pass: 'Altcampus@2018'
      }
    });

    let rand, mailOptions, host, link;
    // generate random ref code
    function randomN(v) {
      let rand = [];
      let alphaNum = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < v; i++) {
        let random = Math.floor(Math.random() * 36);
        rand.push(alphaNum[random])
      }
      return rand.join('');
    }
    // it'll provide your localhost or network address
    host = req.get("host");
    let refCode;
    // while(!flag){
    refCode = randomN(6);
    link = `http://${host}/register?ref=${refCode}`;
    const {email} = req.body
    mailOptions = {
      to: email,
      subject: "Verify your email",
      html: `Hello, <br>Please click on <a href='${link}'>click here</a> to verify your email.`
    };
    // send mail with defined transport object(mailOptions)
    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(406).json({ error: "Message could not send" });
      else {
        const newInvite = new Invite({
          emailId: email,
          refCode: refCode,
          isStudent: req.body.isStudent,
          isAdmin: req.body.isAdmin,
          isKitchenStaff: req.body.isStaff
        });
        newInvite.save(err => {
          if (!err) return res.json({ message: `Message sent to ${mailOptions.to}` })
          return res.json({
            message: 'succesfully sent '
          })
        });
      }
    });
  },

  getStudent: (req, res, next) => {
    Student.aggregate([{ $match: { isStudent: true } },
    {
      $group: {
        _id: "Students List", students: {
          $push: {
            id: "$_id",
            name: "$name",
            email: "$email"
          }
        }
      }
    }], (err, user) => {
      if (user.length === 0) return res.json({ message: 'No student found in the database' })
      if (err) return res.json({ error: "Error while fetching" });
      res.json({
        user: user[0].students
      })
    })
  },

  verifyAdmin: (req, res, next) => {
    res.json({
      message: 'verified'
    })
  },

  forgetPassword: (req, res, next) => {
    res.json({
      message: 'password rest'
    })
  },

  getMenuList: (req, res, next) => {
    Menu.find({}, (err, menu) => {
      if (err) return res.status(500).json({ error: 'Could not get menu' })
      res.json(menu)
    })
  },

  updateMenu: (req, res, next) => {
    // getting updated menu from req.body
    const { menu } = req.body;
    Menu.find({}, function (err, prevMenu) {
      // TODO: PUT check for if menu exists or length is greater than 0
      if (!prevMenu.length) {
        return res.json({ error: "Menu doesn't exist yet." })
      }
      var currentMenu = prevMenu[0];
      currentMenu.menu = menu;
      currentMenu.save(function (err, saved) {
        if (err) return res.json({ error: "Menu cannot be updated." });
        res.json(saved)
      });
    })
  },

  removeStudent: (req, res, next) => {
    const studentId = req.params.id;
    User.findByIdAndDelete(studentId, (err, students) => {
      if (err) return res.json({ error: 'Could not delete student' });
      User.find({ isStudent: true }, (err, user) => {
        if (user.length === 0) return res.json({ message: 'no student found in database' })
        if (err) return res.json({ error: "couldn't fetch" });
        res.json({
          user: user
        })
      })
    })
  }
}