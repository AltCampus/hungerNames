   
    const Menu = require("../model/Menu");
    
    const newMenu = new Menu({
      menu: {
        day1: {
          day: 'monday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day2: {
          day: 'tuesday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day3: {
          day: 'wednesday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day4: {
          day: 'thursday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day5: {
          day: 'friday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day6: {
          day: 'saturday',
          meal: {
            breakfast: {
              title: 'poha',              
            },
            lunch: {
              title: 'rice / aloo / palak / dal'
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        },
        day7: {
          day: 'sunday',
          meal: {
            brunch: {
              title: 'poha',              
            },
            dinner: {
              title: 'roti veg(seasonal)'
            }
          }
        }
      }
    });

    newMenu.save( function(err, menu) {
      if(err) { return next(err); }
      console.log(menu);
    })