const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

const Students = mongoose.model('Students', StudentSchema);
module.exports = Students;