const Student = require('../model/Student')

const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");


module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function(email, password, done) {
        Student.findOne({ email:email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false),{message:'incorrect email'};
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(null,false,{message:'error'})
            if (!isMatch) {
              return done(null, false, { message: "password is incorrect" });
            } else {
              return done(null, user);
            }
          });
        });
      }
    )
  );
};
