const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MenuSchema = new Schema({
  menu: {
    'monday': {
      breakfast: {
        title: { type: String, required: true },
      },
      lunch: {
        title: { type: String, required: true },
      },
      dinner: {
        title: { type: String, required: true },
      },
    },
    'tuesday': {
      breakfast: {
        title: { type: String, required: true },
      },
      lunch: {
        title: { type: String, required: true },
      },
      dinner: {
        title: { type: String, required: true },
      },
    },
    'wednesday': {
      breakfast: {
        title: { type: String, required: true },
      },
      lunch: {
        title: { type: String, required: true },
      },
      dinner: {
        title: { type: String, required: true },
      },
    },
    'thursday': {
      breakfast: {
        title: { type: String, required: true },
      },
      lunch: {
        title: { type: String, required: true },
      },
      dinner: {
        title: { type: String, required: true },
      },
    },
    'friday': {
      breakfast: {
        title: { type: String, required: true },
      },
      lunch: {
        title: { type: String, required: true },
      },
      dinner: {
        title: { type: String, required: true },
      },
    },
    'saturday': {
      breakfast: {
        title: { type: String, required: true },
      },
      lunch: {
        title: { type: String, required: true },
      },
      dinner: {
        title: { type: String, required: true },
      },
    },
    'sunday': {
      brunch: {
        title: { type: String, required: true },
      },
      dinner: {
        title: { type: String, required: true },
      },
    },
  },
  timings: { 
    breakfast: { type: String, default: '9:30 AM' },
    lunch: { type: String, default: '1:30 PM' },
    brunch: { type: String, default: '11:30 AM' },
    dinner: { type: String, default: '8:30 PM' }
  }
 }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;