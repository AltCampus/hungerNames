const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MenuSchema = new Schema({
    'monday': { breakfast: {title:[{ type: String, required: true}],
                            time: { type: Date, default: '9:30 AM' } },
                lunch: [{ type: String, required: true, time: { type: Date, default: '1:30 PM' } }],
                dinner: [{ type: String, required: true, time: { type: Date, default: '8:30 PM' } }]  
              },
    'tuesday': { breakfast: [{ type: String, required: true, time: { type: Date, default: '9:30 AM' } }],
                 lunch: [{ type: String, required: true, time: { type: Date, default: '1:30 PM' } }],
                 dinner: [{ type: String, required: true, time: { type: Date, default: '8:30 PM' } }]  
                },
    'wednesday': { breakfast: [{ type: String, required: true, time: { type: Date, default: '9:30 AM' } }],
                   lunch: [{ type: String, required: true, time: { type: Date, default: '1:30 PM' } }],
                   dinner: [{ type: String, required: true, time: { type: Date, default: '8:30 PM' } }]  
                  },
    'thursday': { breakfast: [{ type: String, required: true, time: { type: Date, default: '9:30 AM' } }],
                  lunch: [{ type: String, required: true, time: { type: Date, default: '1:30 PM' } }],
                  dinner: [{ type: String, required: true, time: { type: Date, default: '8:30 PM' } }]  
                },
    'friday': { breakfast: [{ type: String, required: true, time: { type: Date, default: '9:30 AM' } }],
                lunch: [{ type: String, required: true, time: { type: Date, default: '1:30 PM' } }],
                dinner: [{ type: String, required: true, time: { type: Date, default: '8:30 PM' } }]  
              },
    'saturday': { breakfast: [{ type: String, required: true, time: { type: Date, default: '9:30 AM' } }],
                  lunch: [{ type: String, required: true, time: { type: Date, default: '1:30 PM' } }],
                  dinner: [{ type: String, required: true, time: { type: Date, default: '8:30 PM' } }]  
                },
    'sunday': { brunch: [{ type: String, required: true, time: { type: Date, default: '11:30 AM' } }],
                dinner: [{ type: String, required: true, time: { type: Date, default: '8:30 PM' } }]  
              },  
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;