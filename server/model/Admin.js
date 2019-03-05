const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Students" }],
  staff: { type: Schema.Types.ObjectId, ref: "Staff" },
  menu: [{ type: Schema.Types.ObjectId, ref: "Menu" }]
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;