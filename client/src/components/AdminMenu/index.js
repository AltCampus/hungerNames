import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDaysCheckList from '../AdminDaysCheckList';
import AdminSideMenu from '../AdminSideMenu';
import Loader from '../Loader';
import { getMenu } from '../../store/actions/';
import '../StudentHome/StudentHome.css';

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu || {},
    message: state.menu.message || {}
  };

}

class AdminMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.days = ["day1", "day2", "day3", "day4", "day5", "day6", "day0"];
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    this.props.dispatch(getMenu((menuRecieved) => {
      if(menuRecieved) {
        this.setState({
          isLoading: false,
        });
      }
    }));
  }

  render() {
    const { menu } = this.props;
    
    return (
      <>
        <AdminSideMenu />
        {(this.state.isLoading) ? (
        <div className='center'>
          <Loader /> 
        </div>
        ) : (
        <div className="wrapper">          
          <div className="home">
            {(menu && menu.day1) ? (
              this.days.map((val, index) => {
                return <AdminDaysCheckList key={index} onDay={menu[val]} />
              })
            ) : ''}
          </div>
        </div> )}
      </>
    );
  }
}

export default connect(mapStateToProps)(AdminMenu);