const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isKitchenStaff: { type: Boolean, default: false },
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)
var noop = function() {};
StudentSchema.pre("save", function(done) {
  var user = this;
  if (!user.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return done(err);
    }
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) {
        return done(err);
      }
      user.password = hashedPassword;
      done();
    });
  });
});

const Students = mongoose.model('Students', StudentSchema);
module.exports = Students;