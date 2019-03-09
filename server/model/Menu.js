const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MenuSchema = new Schema({
  menu: {
    day1: {
      day: String,
      meal: {
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
        }
      },
    },
    day2: {
      day: String,
      meal: {
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
    },
    day3: {
      day: String,
      meal: {
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
        }
      }
    },
    day4: {
      day: String,
      meal: {
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
    },
    day5: {
      day: String,
      meal: {
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
    },
    day6: {
      day: String,
      meal: {
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
    },
    day7:{
      day: String,
      meal: {      
        brunch: {
          title: { type: String, required: true },
          time: { type: Date, default: Date.now },  
        },
        dinner: {
          title: { type: String, required: true },
          time: { type: Date, default: Date.now },  
        },
      },
    },
  } 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;