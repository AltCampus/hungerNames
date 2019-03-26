import React, { Component } from 'react';
import AdminMenu from '../AdminMenu';
import AdminSideMenu from '../AdminSideMenu';
import './AdminHome.css';


class AdminHome extends Component {
  render() {
    return (
      <>
        <AdminSideMenu />
        <AdminMenu />        
      </>
    );
  }
}

export default AdminHome;