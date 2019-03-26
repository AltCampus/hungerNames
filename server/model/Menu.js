const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MenuSchema = new Schema({
  menu: {
    day0: {
      day: String,
      meal: {
        brunch: {
          title: { type: String, required: true },
          time: { type: String, default: '11 AM' },
        },
        dinner: {
          title: { type: String, required: true },
          time: { type: String, default: '8 PM' },
        },
      },
    },
    day1: {
      day: String,
      meal: {
        breakfast: {
          title: { type: String, required: true },
          time: { type: String, default: '9:30 AM' },  
        },
        lunch: {
          title: { type: String, required: true },
          time: { type: String, default: '1:30 PM' },  
        },
        dinner: {
          title: { type: String, required: true },
          time: { type: String, default: '8 PM' },  
        }
      },
    },
    day2: {
      day: String,
      meal: {
        breakfast: {
          title: { type: String, required: true },
          time: { type: String, default: '9:30 AM' },  
        },
        lunch: {
          title: { type: String, required: true },
          time: { type: String, default: '1:30 PM' },  
        },
        dinner: {
          title: { type: String, required: true },
          time: { type: String, default: '8 PM' },  
        },
      },
    },
    day3: {
      day: String,
      meal: {
        breakfast: {
          title: { type: String, required: true },
          time: { type: String, default: '9:30 AM' },  
        },
        lunch: {
          title: { type: String, required: true },
          time: { type: String, default: '1:30 PM' },  
        },
        dinner: {
          title: { type: String, required: true },
          time: { type: String, default: '8 PM' },  
        }
      }
    },
    day4: {
      day: String,
      meal: {
        breakfast: {
          title: { type: String, required: true },
          time: { type: String, default: '9:30 AM' },  
        },
        lunch: {
          title: { type: String, required: true },
          time: { type: String, default: '1:30 PM' },  
        },
        dinner: {
          title: { type: String, required: true },
          time: { type: String, default: '8 PM' },  
        },
      },
    },
    day5: {
      day: String,
      meal: {
        breakfast: {
          title: { type: String, required: true },
          time: { type: String, default: '9:30 AM' },  
        },
        lunch: {
          title: { type: String, required: true },
          time: { type: String, default: '1:30 PM' },  
        },
        dinner: {
          title: { type: String, required: true },
          time: { type: String, default: '8 PM' },  
        },
      },
    },
    day6: {
      day: String,
      meal: {
        breakfast: {
          title: { type: String, required: true },
          time: { type: String, default: '9:30 AM' },  
        },
        lunch: {
          title: { type: String, required: true },
          time: { type: String, default: '1:30 PM' },  
        },
        dinner: {
          title: { type: String, required: true },
          time: { type: String, default: '8 PM' },  
        },
      },
    },

  } 
}, {
  timestamps: {
    createdAt: 'created_at',
    upStringdAt: 'upStringd_at'
  }
});

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;