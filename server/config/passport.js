const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Students = mongoose.model('Students');

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',passwordField: 'password'}, (email, password, done) => {
    Students.findOne({ email }, (err, admin) => {
      if (err) { return done(err) }
      if(!admin) return res.json({
        message: 'Admin not found'
      })
      if(!admin.isAdmin) return res.json({
        message: 'Admin not found'
      })
      if (!admin) { return done(null, false) }
      bcrypt.compare(password, admin.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, admin);
        } else {
          return done(null, false, { message: "password is incorrect" });
        }
      })
    })
  }))
}
