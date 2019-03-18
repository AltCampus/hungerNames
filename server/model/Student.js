const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // isDeleted: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isKitchenStaff: { type: Boolean, default: false },
  isStudent: { type: Boolean, default: false },
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

// using plugin from mongoose-delete
// StudentSchema.plugin(mongoose_delete);

StudentSchema.pre("save", function (next) {
  const password = this.password;
<<<<<<< HEAD
  if(this.isModified(password)) return next();
=======

  if (this.isModified(password)) return next();

>>>>>>> 8d7f7f463252b82d6e774476d8c8b46c40471ac7
  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if (err) throw err;
    this.password = hash;
    next();
  });
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;