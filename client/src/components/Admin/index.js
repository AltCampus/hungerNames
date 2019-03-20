import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminHome from '../AdminHome';
import AdminSideMenu from '../AdminSideMenu';
import AdminDayList from '../AdminDayList';
import AdminMenu from '../AdminMenu';
import NewInvite from '../NewInvite';
import ListStudentsAdmin from '../ListStudentsAdmin';
import PrivateRoute from '../PrivateRoute';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path='/admin' component={AdminHome} />
          <Route exact path='/admin/sidemenu' component={AdminSideMenu} />
          <Route exact path='/admin/invite' component={NewInvite} />
          <Route exact path='/admin/menu' component={AdminMenu} />
          <Route exact path='/admin/menu/:day' component={AdminDayList} />
          <Route exact path='/admin/getallstudentslist' component={ListStudentsAdmin} />
        </Switch>

      </>
    )
  }
}

export default connect(mapStateToProps)(Admin);