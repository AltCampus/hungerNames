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
import StudentList from './StudentList';
import './Main.css';
import FeedbackListView from './FeedbackListView';
import StudentSideMenu from './StudentSideMenu';
import AdminSideMenu from './AdminSideMenu';
import StaffSideMenu from './StaffSideMenu';

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
            <Route exact path='/staff/feedbacks' component={ FeedbackListView } />
            <Route exact path='/staff/feedbacks/feedbacklist/:id' component={ Feedbacks } />
            <Route exact path='/' component={ StudentHome } />
            <Route exact path='/admin/menu/:day' component={ AdminDayList } />
            <Route exact path='/admin' component={ AdminHome } />
            <Route exact path='/staff/list/:meal' component={ StudentList } />
            <Route exact path='/student/:id' component={ StudentSideMenu } />
            <Route path='/student/feedbacks/:id' component={ StudentFeedback } />
            <Route exact path='/:day' component={ DayList } />
            {/* checking staff and admin side menu for tesing purpose */}
            <Route exact path='/admin/sidemenu' component={ AdminSideMenu } />
            <Route exact path='/staff/sidemenu' component={ StaffSideMenu } />            
          </Switch>
        </>
      </BrowserRouter>
  );
}

export default Main;