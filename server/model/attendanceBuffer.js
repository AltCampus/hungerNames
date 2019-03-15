const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceBufferSchema = new Schema({
  date: { type: Date },
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
