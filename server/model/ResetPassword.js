const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ResetPasswordSchema = new Schema({
  emailId: { type: String, unique: true },
  refCode: { type: String }
})

const ResetPassword = mongoose.model('ResetPassword', ResetPasswordSchema);
module.exports = ResetPassword;