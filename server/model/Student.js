const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

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


StudentSchema.pre("save", function(next) {
  const password = this.password;

  if(this.isModified(password)) return next();

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if(err) throw err;
    this.password = hash;
    next();
  });
});

const Student = mongoose.model('Students', StudentSchema);
module.exports = Student;