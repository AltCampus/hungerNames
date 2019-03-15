import React, { Component } from 'react';
import { connect } from 'react-redux';
import DaysCheckList from '../DaysCheckList';
import { getMenu } from '../../store/actions/';
import './StudentHome.css';

const mapStateToProps = (state) => {
  if(state.menu) {
    return {
      menu: state.menu.menu || {},
      message: state.menu.message || {}
    };
  }
}

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state= {};
    this.days = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];
  }

  componentDidMount(){
    this.props.dispatch(getMenu());
  }

  render() {
    const { menu } = this.props;   
    // console.log('m');    
    return(
      <div className="wrapper">
        {/* <SideMenu /> */}
        <div className="home">
          { (menu && menu.day1) ? (
              this.days.map((val, index) => {
                for(let day in menu) {
                  if(day === val) {                    
                    return <DaysCheckList key={index} onDay={menu[val]}/>
                  }
                }
              }
            )
          ) : '' }
        </div> 
      </div>
    );
  }
}

export default connect(mapStateToProps)(StudentHome);