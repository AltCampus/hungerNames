import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import NewInvite from '../NewInvite';
import AdminMenu from '../AdminMenu';
import AdminSideMenu from '../AdminSideMenu';
import './AdminHome.css';


class AdminHome extends Component {
  render() {
    return (
      <>
        <AdminSideMenu />
        <AdminMenu />
        {/* <div className="contain-wrapper">
          <Link to='/admin/invite'>
            <button className='send-btn'>Send a new Invite</button>
          </Link>
          <Link to='/admin/menu'>
            <button className='send-btn'>Edit/ Add menu</button>
          </Link>
        </div> */}
          
        <Switch>
          <Route exact path='/admin/invite' component={ NewInvite } />
          <Route exact path='/admin/menu' component={ AdminMenu } />
        </Switch>
      </>
    );
  }
}

export default AdminHome;