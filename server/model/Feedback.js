const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
  date: { type: String, unique: true},
  meal: { type: String },
  mealType: { type: String },
  review: { type: String },
  rating: { type: Number },
  // studentId: { type:Schema.Types.ObjectId},
  student: { type: Schema.Types.ObjectId, ref: 'Students' }
}, {
    timestamps: { createdAt: 'created_at' }
  }
)

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback