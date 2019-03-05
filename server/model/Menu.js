const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MenuSchema = new Schema({
    'monday': [{ breakfast: [{ type: String, required: true }],
                 lunch: [{ type: String, required: true }],
                 dinner: [{ type: String, required: true }]  
              }],
    'tuesday': [{ breakfast: [{ type: String, required: true }],
                  lunch: [{ type: String, required: true }],
                  dinner: [{ type: String, required: true }]  
                }],
    'wednesday': [{ breakfast: [{ type: String, required: true }],
                    lunch: [{ type: String, required: true }],
                    dinner: [{ type: String, required: true }]  
                  }],
    'thursday': [{ breakfast: [{ type: String, required: true }],
                  lunch: [{ type: String, required: true }],
                  dinner: [{ type: String, required: true }]  
                }],
    'friday': [{ breakfast: [{ type: String, required: true }],
                lunch: [{ type: String, required: true }],
                dinner: [{ type: String, required: true }]  
              }],
    'saturday':[{ breakfast: [{ type: String, required: true }],
                  lunch: [{ type: String, required: true }],
                  dinner: [{ type: String, required: true }]  
                }],
    'sunday': [{ brunch: [{ type: String, required: true }],
                 dinner: [{ type: String, required: true }]  
              }],  
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;