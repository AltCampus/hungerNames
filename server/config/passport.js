const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Students = mongoose.model("Students");
const User = require('../model/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        Students.findOne({ email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "password is incorrect" });
            }
          });
          if (user.isAdmin) {
            return done(null, user)
          } 
          if (user.isKitchenStaff) {
            return done(null, user);
          } 
        });
      }
    )
  );
};
