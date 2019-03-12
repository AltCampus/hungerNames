const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceBufferSchema = new Schema({
  date: {type: Date},
  studentList: {
    breakfast: [{ type: Schema.Types.ObjectId, ref: 'Students' }],
    lunch: [{ type: Schema.Types.ObjectId, ref: 'Students' }],
    dinner: [{ type: Schema.Types.ObjectId, ref: 'Students' }]
  }
});