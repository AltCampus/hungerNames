const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const InviteSchema = new Schema({
  emailId: { type: String, unique: true },
  refCode: { type: String },
  isStudent: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isKitchenStaff: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
})

const Invite = mongoose.model('Invite', InviteSchema);
module.exports = Invite;