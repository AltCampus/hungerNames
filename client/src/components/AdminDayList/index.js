import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactSpinner from '../ReactSpinner'
import { updateMenu } from '../../store/actions';
import '../DayList/DayList.css';
import AdminSideMenu from '../AdminSideMenu';

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu || {}
  };
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
    this.currentday = null;
  }
  componentDidMount() {
    const { day } = this.props.match.params;
    const { menu } = this.props;
    Object.keys(menu).map(val => {
      if (menu[val].day == day) this.currentday = val;
    })
    if (day == 'Sunday') {
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

    if (day === 'Sunday') {
      menu[this.currentday].meal.brunch.title = this.state.brunch;
      menu[this.currentday].meal.dinner.title = this.state.dinner;
    } else {
      menu[this.currentday].meal.breakfast.title = this.state.breakfast;
      menu[this.currentday].meal.lunch.title = this.state.lunch;
      menu[this.currentday].meal.dinner.title = this.state.dinner;
    }
    //dispatch update menu with menu

    this.props.dispatch(updateMenu({ menu }, (isSubmitted) => {
      if (isSubmitted) {
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
        <AdminSideMenu />
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="check-list-page">
          {(day === 'Sunday') ? (
            <div>
              <h2 className="day-name">{day}</h2>
              <label className="label-box" htmlFor="brunch">
                <p className="meal">Brunch:</p>
                <input type="text" name='brunch' value={this.state.brunch} onChange={this.handleChange} />
              </label>
              <label className="label-box" htmlFor="dinner">
                <p className="meal">Dinner:</p>
                <input type="text" name='dinner' value={this.state.dinner} onChange={this.handleChange} />
              </label>
              <button type="submit" className="send-btn" >Save →</button>
            </div>
          )
            : (
              <div>
                <h2 className="day-name">{day}</h2>
                <label className="label-box" htmlFor="breakfast">
                  <p className="meal">Breakfast:</p>
                  <input type="text" name='breakfast' value={this.state.breakfast} onChange={this.handleChange} />
                </label>
                <label className="label-box" htmlFor="lunch">
                  <p className="meal">Lunch:</p>
                  <input type="text" name='lunch' value={this.state.lunch} onChange={this.handleChange} />
                </label>
                <label className="label-box" htmlFor="dinner">
                  <p className="meal">Dinner:</p>
                  <input type="text" name='dinner' value={this.state.dinner} onChange={this.handleChange} />
                </label>
                <div className='center'>
                  <button type="submit" className="form-btn send-btn center" onClick={this.formSubmit}>Save → {this.state.isLoading ? <ReactSpinner /> : ''}</button>
                </div>
              </div>
            )
          }
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(AdminDayList);
