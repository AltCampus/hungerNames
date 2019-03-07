const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const InviteSchema = new Schema({
  emailId: { type: String },
  refCode: { type: String },
  isVerified: { type: Boolean, default: false },
})

const Invite = mongoose.model('Invite', InviteSchema);
module.exports = Invite;