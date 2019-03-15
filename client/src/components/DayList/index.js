import React, { Component } from 'react';
import { connect } from 'react-redux';
import util from '../../util/index'
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
              if( day !== 'Sunday' && menu[val].day ===  day) {                
                return (                  
                  <form action="" key={day}>
                    <h2 className="day-name">{day}</h2>
                    <label className="label-box" htmlFor="breakfast">
                      <input type="checkbox" onChange={() => {this.handlechange(date,type)}} id="breakfast" name={`${day}-breakfast`}/>
                        <p className="meal">
                          Breakfast: {menu[val].meal.breakfast.title}
                        </p>
                      </label>
                    <label className="label-box" htmlFor="lunch">
                      <input type="checkbox" id="lunch" name={`${day}-lunch`}/>
                        <p className="meal">
                          Lunch: {menu[val].meal.lunch.title}
                        </p>
                      </label>
                    <label className="label-box" htmlFor="dinner" name={`${day}-dinner`}>
                      <input type="checkbox" id="dinner" />
                        <p className="meal"> 
                          Dinner: {menu[val].meal.dinner.title}    
                        </p>
                      </label>
                    <button type="submit" className="form-btn send-btn">Save →</button>
                  </form>
                );
              } 
              else if(day === 'Sunday' && menu[val].day === 'Sunday') {
                return (
                  <form action="" key={day}>
                  <h2 className="day-name">{day}</h2>
                  <label className="label-box" htmlFor="brunch">
                    <input type="checkbox" id="brunch" name={`${day}-brunch`}/>
                      <p className="meal">                      
                        Brunch: {menu[val].meal.brunch.title}
                      </p>
                    </label>
                  <label className="label-box" htmlFor="dinner">
                    <input type="checkbox" id="dinner" name={`${day}-dinner`}/>
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
  }}

export default connect(mapStateToProps)(DayList);
