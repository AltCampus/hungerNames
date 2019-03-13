import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './DayList.css';

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu || {}
  };
}
class DayList extends Component {

  render() {
    const { day } = this.props.match.params;
    const { menu } = this.props;
    
    return (
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="check-list-page">
          {(menu && menu.day1) ? (
            Object.keys(menu).map((val, index) => {              
              if( day !== 'sunday' && menu[val].day ===  day) {                
                return (                  
                  <form action="" key={day}>
                    <h2 className="day-name">{day}</h2>
                    <label className="label-box" htmlFor="breakfast">
                      <input type="checkbox" id="breakfast" />
                        <p className="meal">
                          Breakfast: {menu[val].meal.breakfast.title}
                        </p>
                      </label>
                    <label className="label-box" htmlFor="lunch">
                      <input type="checkbox" id="lunch" />
                      <p className="meal">
                          Lunch: {menu[val].meal.lunch.title}
                        </p>
                      </label>
                    <label className="label-box" htmlFor="dinner">
                      <input type="checkbox" id="dinner" />
                        <p className="meal">                        
                          Dinner: {menu[val].meal.dinner.title}    
                        </p>
                      </label>
                    <button type="submit" className="form-btn send-btn">Save →</button>
                  </form>
                );
              } 
              else if(day === 'sunday' && menu[val].day === 'sunday') {
                return (
                  <form action="" key={day}>
                  <h2 className="day-name">{day}</h2>
                  <label className="label-box" htmlFor="brunch">
                    <input type="checkbox" id="brunch" />
                      <p className="meal">                      
                        Brunch: {menu[val].meal.brunch.title}
                      </p>
                    </label>
                  <label className="label-box" htmlFor="dinner">
                    <input type="checkbox" id="dinner" />
                      <p className="meal">                      
                        Dinner: {menu[val].meal.dinner.title}
                      </p>
                    </label>
                  <button type="submit" className="form-btn send-btn">Save →</button>
                </form>
                );
              }
            })
          ) : ''
          }
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(DayList);
