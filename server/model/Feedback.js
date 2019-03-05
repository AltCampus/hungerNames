const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FeedbackSchema = new Schema({
    meal: { type: String },
    mealType: {
      'breakfast': { title: String },
      'lunch': { title: String },
      'dinner': { title: String }
    },
    review: { type: String },
    rating: { type: Number },
    students: [{ type: Schema.Types.ObjectId, ref: 'Students' }]
  }, {
    timestamps: { createdAt: 'created_at' }
  }
)

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback