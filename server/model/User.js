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
 StudentSchema.pre('save', function(next) {
   if(this.password) {
     this.password = bcrypt.hashSync(this.password,saltRounds);
     next();
   } else {
     next();
   }
 })

const Students = mongoose.model('Students', StudentSchema);
module.exports = Students;