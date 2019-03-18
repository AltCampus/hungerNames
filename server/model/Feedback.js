const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
    meal: { type: String },
    mealType: { type: String },
    review: { type: String },
    rating: { type: Number },
    date: { type: Date, default: new Date() },
    // studentId: { type:Schema.Types.ObjectId},
    student: { type: Schema.Types.ObjectId, ref: 'Student' }
  }, {
    timestamps: { createdAt: 'created_at' }
  }
)

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback