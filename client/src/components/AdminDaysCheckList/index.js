import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../DaysCheckList/DaysCheckList.css';
import AdminSideMenu from '../AdminSideMenu';


class DaysCheckList extends Component {

  render() {
    const { day, meal } = this.props.onDay;
    return (
      <>
        <AdminSideMenu />
        <div className="check-list">
          <div className="content__check-list">            
            <Link to={`/admin/menu/${ day }` } className="day-mark unlink content-justify">
              <div >            
                <p className="day-name">{ day }</p>
                <div className="meal-types">            
                {(day === 'Sunday') ? 
                  (  
                    <div className="brunch">
                      <span className="meal">Brunch: </span>
                      <span>{ meal.brunch ?  meal.brunch.title : '' }</span>
                    </div>
                  ) :               
                  ( <>                
                    <div className="breakfast">
                      <span className="meal">Breakfast: </span>
                      <span>{ meal.breakfast ?  meal.breakfast.title : '' } </span>
                    </div>
                    <div className="lunch">
                      <span className="meal">Lunch: </span>
                      <span>{ meal.lunch ?  meal.lunch.title : '' }</span>
                    </div>
                  </>
                )}
                  <div className="dinner">
                    <span className="meal">Dinner: </span>
                    <span>{ meal.dinner ?  meal.dinner.title : '' }</span>
                  </div>                          
                </div>
              </div>
              <div className="meal-arrow">
                <i className="fas checklist-icon fa-angle-right fa-3x"></i>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default DaysCheckList;