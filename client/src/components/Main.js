import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import StudentHome from './StudentHome';
import AdminHome from './AdminHome';
import DayList from './DayList';
import AdminDayList from './AdminDayList';
import StudentFeedback from './StudentFeedback';
import StaffHome from './StaffHome';
import Feedbacks from './Feedbacks';
import './Main.css';

const Main = (props) => {
  return (
    
      <BrowserRouter>
        <>
          <div className="logo-box">
            <Link to="/" className="logo wrapper">Hunger<span className="sub-logo">names</span></Link>
          </div>

          <div className="side-menu">
              
          </div>          
          <Switch>
            <Route path='/register' component={ Register } />
            <Route path='/login' component={ Login } />
            <Route exact path='/staff' component={ StaffHome } />
            <Route exact path='/staff/feedback' component={ Feedbacks } />
            <Route exact path='/' component={ StudentHome } />
            <Route exact path='/admin/menu/:day' component={ AdminDayList } />
            <Route path='/admin' component={ AdminHome } />
            <Route exact path='/student/:id/feedback' component={ StudentFeedback } />
            <Route exact path='/:day' component={ DayList } />
          </Switch>
        </>
      </BrowserRouter>
  );
}

export default Main;