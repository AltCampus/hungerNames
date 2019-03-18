const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
<<<<<<< HEAD
    meal: { type: String },
    mealType: { type: String },
    review: { type: String },
    rating: { type: Number },
    date: { type: Date, default: new Date() },
    // studentId: { type:Schema.Types.ObjectId},
    student: { type: Schema.Types.ObjectId, ref: 'Student' }
  }, {
=======
  meal: { type: String },
  mealType: { type: String },
  review: { type: String },
  rating: { type: Number },
  date: { type: String },
  // studentId: { type:Schema.Types.ObjectId},
  student: { type: Schema.Types.ObjectId, ref: 'Students' }
}, {
>>>>>>> 8d7f7f463252b82d6e774476d8c8b46c40471ac7
    timestamps: { createdAt: 'created_at' }
  }
)

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback