const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Students = mongoose.model('Students');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, 
  function(email, password, done) {
    Students.findOne({ email }, (err, user) => {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    })
  }))
}