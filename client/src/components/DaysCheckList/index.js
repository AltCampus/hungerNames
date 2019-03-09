import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './DaysCheckList.css';
import { getMenu } from '../../store/actions/';

class DaysCheckList extends Component {
    constructor(props){
      super(props);
      this.state ={
        check : false,
      }
    }
    setCheck = () => {
      this.setState({check:!this.state.check})
    }

    componentDidMount = () => {
      this.props.dispatch(getMenu());
    }
  
  render() {
    const { day } = this.props;
    return (
      <div className="check-list">
        <div className="content__check-list">
          <span>
            <div className="check-mark" onClick = {() => this.setCheck()}>
              <i className={`fas checklist-icon fa-3x ${this.state.check ? 'fa-check-circle' : 'fa-circle' }`}></i>
              {/* <i className={`fas fa-check-circle `}></i> */}
              {/* <i className="fas fa-circle"></i> */}
            </div>
          </span>
          <Link to={`/${day}`} className="day-mark">
            <p className="day-name">{ day }</p>
            <div className="meal-types">
              <div className="breakfast">
                <span className="meal">Breakfast: </span>
                <span></span>
              </div>
              <span className="meal">Lunch</span>
              <span className="meal">Dinner</span>
            </div>
          </Link>
        </div>
        <Link to={`/${day}`} className="meal-arrow">
          <i className="fas checklist-icon fa-angle-right fa-3x"></i>
        </Link>
      </div>
    );
  }
}

export default connect()(DaysCheckList);