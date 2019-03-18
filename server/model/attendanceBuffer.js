const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceBufferSchema = new Schema({
<<<<<<< HEAD
  date: { type: String },
=======
  date: { type: String, unique: true },
>>>>>>> 8d7f7f463252b82d6e774476d8c8b46c40471ac7
  breakfast: {
    title: String,
    remarks: String,
    attendance: [{
      student: { type: Schema.Types.ObjectId, ref: 'Students' },
      feedback: { type: Schema.Types.ObjectId, ref: 'Feedback' }
    }]
  },
  brunch: {
    title: String,
    remarks: String,
    attendance: [{
      student: { type: Schema.Types.ObjectId, ref: 'Students' },
      feedback: { type: Schema.Types.ObjectId, ref: 'Feedback' }
    }]
  },
  lunch: {
    title: String,
    remarks: String,
    attendance: [{
      student: { type: Schema.Types.ObjectId, ref: 'Students' },
      feedback: { type: Schema.Types.ObjectId, ref: 'Feedback' }
    }]
  },
  dinner: {
    title: String,
    remarks: String,
    attendance: [{
      student: { type: Schema.Types.ObjectId, ref: 'Students' },
      feedback: { type: Schema.Types.ObjectId, ref: 'Feedback' }
    }]
  },
});

module.exports = mongoose.model('AttendanceBuffer', AttendanceBufferSchema);
