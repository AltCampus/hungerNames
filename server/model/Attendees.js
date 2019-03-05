const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AttendeesSchema = new Schema({
  Date: new Date(),
  mealType: {
    'breakfast': { 
      title: String, 
      students: [{ type: Schema.Types.ObjectId, ref: 'Students' }],
      feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
    },
    'lunch': {
      title: String,
      students: [{ type: Schema.Types.ObjectId, ref: 'Students' }],
      feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
    },
    'dinner': {
      title: String,
      students: [{ type: Schema.Types.ObjectId, ref: 'Students' }],
      feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }]
    }
  }
})

const Attendees = mongoose.model('Attendees', AttendeesSchema);
module.exports = Attendees;