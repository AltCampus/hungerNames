const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ratings: [{ type: String, required: true }],
  feedback: [{ type: String, required: true }]
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

const Students = mongoose.model('Students', StudentSchema);
module.exports = Students;