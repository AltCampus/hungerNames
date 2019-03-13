import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Loader'
import { updateMenu } from '../../store/actions';
import '../DayList/DayList.css';

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu || {}
  };
}

function SuccessMessage() {
  return <p>Menu has been successfuly saved</p>;
}

class AdminDayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakfast: '',
      lunch: '',
      dinner: '',
      brunch: '',
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.currentday=null;
  }
  componentDidMount() {
    const { day } = this.props.match.params;
    const { menu } = this.props;
    Object.keys(menu).map(val => {
      if (menu[val].day == day) this.currentday = val;
    })
    if (day == 'sunday') {
      this.setState({
        brunch: menu[this.currentday].meal.brunch.title,
        dinner: menu[this.currentday].meal.dinner.title,
      })
    } else {
      this.setState({
        breakfast: menu[this.currentday].meal.breakfast.title,
        lunch: menu[this.currentday].meal.lunch.title,
        dinner: menu[this.currentday].meal.dinner.title,
      })
    }
  }
  
  formSubmit = (e) => {
    const { day } = this.props.match.params;
    const { menu } = this.props;

    this.setState({
      isLoading: true
    });

    if(day === 'sunday') {
      menu[this.currentday].meal.brunch.title = this.state.brunch;
      menu[this.currentday].meal.dinner.title = this.state.dinner;
    } else {
      menu[this.currentday].meal.breakfast.title = this.state.breakfast;
      menu[this.currentday].meal.lunch.title = this.state.lunch;
      menu[this.currentday].meal.dinner.title = this.state.dinner;
    }
  //dispatch update menu with menu
  
  this.props.dispatch(updateMenu({ menu }, (isSubmitted) => {
    if(isSubmitted) {
      this.setState({
        isLoading: false
      });
    }
  }
  ))
}
  
  handleChange = () => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { day } = this.props.match.params;

    return (
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="check-list-page">
          {(day === 'sunday') ? (
            <div>
              <h2 className="day-name">{day}</h2>
              <label className="label-box" htmlFor="brunch">
                <input type="checkbox" id="brunch" />
                <p className="meal">
                  Brunch: 
                  <input type="text" name='brunch' value={this.state.brunch} onChange={this.handleChange} />
                </p>
              </label>
              <label className="label-box" htmlFor="dinner">
                <input type="checkbox" id="dinner" />
                <p className="meal">
                  Dinner: 
                    <input type="text" name='dinner' value={this.state.dinner} onChange={this.handleChange} />
                </p>
              </label>
              <button type="submit" className="send-btn" >Save →</button>
            </div>
          )
            : (
              <div>
                <h2 className="day-name">{day}</h2>
                <label className="label-box" htmlFor="breakfast">
                  <input type="checkbox" id="breakfast" />
                  <p className="meal">
                    Breakfast:
                          <input type="text" name='breakfast' value={this.state.breakfast} onChange={this.handleChange} />
                  </p>
                </label>
                <label className="label-box" htmlFor="lunch">
                  <input type="checkbox" id="lunch" />
                  <p className="meal">
                    Lunch:
                          <input type="text" name='lunch' value={this.state.lunch} onChange={this.handleChange} />
                  </p>
                </label>
                <label className="label-box" htmlFor="dinner">
                  <input type="checkbox" id="dinner" />
                  <p className="meal">
                    Dinner:
                          <input type="text" name='dinner' value={this.state.dinner} onChange={this.handleChange} />
                  </p>
                </label>      
                <button type="submit" className="form-btn send-btn" onClick={this.formSubmit}>Save →</button> 
                {this.state.isLoading ? <Loader /> : ''}

              </div>
            )

          }
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(AdminDayList);
