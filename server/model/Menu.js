const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MenuSchema = new Schema({
  menu: {
    'monday': {
      breakfast: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      lunch: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      dinner: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
    },
    'tuesday': {
      breakfast: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      lunch: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      dinner: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
    },
    'wednesday': {
      breakfast: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      lunch: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      dinner: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
    },
    'thursday': {
      breakfast: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      lunch: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      dinner: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
    },
    'friday': {
      breakfast: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      lunch: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      dinner: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
    },
    'saturday': {
      breakfast: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      lunch: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      dinner: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
    },
    'sunday': {
      brunch: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
      dinner: {
        title: { type: String, required: true },
        time: { type: Date, default: Date.now },  
      },
    },
  } }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;