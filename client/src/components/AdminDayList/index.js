import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../DayList/DayList.css';

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu || {}
  };
}


class AdminDayList extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      breakfast: '',
      lunch: '',
      dinner: '',
      brunch: ''
    };
    this.handleChange = this.handleChange.bind(this);

  }
  
  handleChange = () => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { day } = this.props.match.params;
    const { menu } = this.props;
    
    return (
      <>
        <div className="back-btn-box">
          <Link to="/" className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </Link>
        </div>
        <div className="check-list-page">
          {(menu && menu.day1) ? (
            Object.keys(menu).map((val) => {              
              if( day !== 'sunday' && menu[val].day ===  day) {
                return (
                  <form action="" key={day}>
                    <h2 className="day-name">{day}</h2>
                    <label className="label-box" htmlFor="breakfast">
                      <input type="checkbox" id="breakfast" />
                        <p className="meal">
                          Breakfast: 
                          <input type="text" name='breakfast' value={(this.state.breakfast === '') ? menu[val].meal.breakfast.title : this.state.breakfast} onChange={this.handleChange}/>
                        </p>
                      </label>
                    <label className="label-box" htmlFor="lunch">
                      <input type="checkbox" id="lunch" />
                      <p className="meal">
                          Lunch: 
                          <input type="text" name='lunch' value={(this.state.lunch === '') ? menu[val].meal.lunch.title : this.state.lunch} onChange={this.handleChange}/>
                      </p>
                      </label>
                    <label className="label-box" htmlFor="dinner">
                      <input type="checkbox" id="dinner" />
                        <p className="meal">                        
                          Dinner: 
                          <input type="text" name='dinner' value={(this.state.dinner === '') ? menu[val].meal.dinner.title : this.state.dinner} onChange={this.handleChange}/>
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
                        <input type="text" name='brunch' value={menu[val].meal.brunch.title} onChange={this.handleChange}/>
                      </p>
                    </label>
                  <label className="label-box" htmlFor="dinner">
                    <input type="checkbox" id="dinner" />
                      <p className="meal">                      
                        Dinner: 
                        <input type="text" name='dinner' value={menu[val].meal.dinner.title} onChange={this.handleChange}/>
                      </p>
                    </label>
                  <button type="submit" className="send-btn" >Save →</button>
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

export default connect(mapStateToProps)(AdminDayList);
