const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
  date: { type: String },
  meal: { type: String },
  mealType: { type: String },
  review: { type: String },
  rating: { type: Number },
  student: { type: Schema.Types.ObjectId, ref: 'Student' }
}, {
    timestamps: { createdAt: 'created_at' }
  }
)

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback