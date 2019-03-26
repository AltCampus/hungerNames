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
        passwordField: "password"
      },
      function(email, password, done) {
        Student.findOne({ email:email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(null,false)
            if (!isMatch) {
              return done(null, false);
            } else {
              return done(null, user);
            }
          });
        });
      }
    )
  );
};
