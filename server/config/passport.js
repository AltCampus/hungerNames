
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Students = mongoose.model("Students");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        console.log(password)
        Students.findOne({ email }, (err, user) => {
          console.log(user, 'inside passport.js');
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
        });
      }
    )
  );
};
