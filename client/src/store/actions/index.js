import { util } from "../../util";

// export function loginUserAction(data) {
//   return dispatch => {
//     fetch(`${util.baseURL}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (!data.error) {
//           dispatch({
//             type: "LOGIN_USER",
//             data: data
//           });
//         }
//       });
//   };
// };

export function loginUserAction(data) {
  return (dispatch) => {
    console.log(data, 'inAction');
    fetch(`${util.baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'login data');
        if (!data.error) {
          let token = `Hungry ${data.token}`;
          localStorage.setItem('hungerNamesJWT', token) //will modify acc to server
          dispatch({
            type: "LOGIN_USER",
            data: data.user,
            token: token,
          });
        }
      });
  };
};

export function logoutUserAction(data) {
  return (dispatch) => {
    localStorage.removeItem('hungerNamesJWT');
    dispatch({
      type: "LOGOUT_USER",
    });
  };
};
export function registerUserAction(data, cb) {
  return dispatch => {
    fetch(`${util.baseURL}/student/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          cb(true)
        } else cb(false)
      });
  };

};


export function getMenu() {
  return async (dispatch) => {
    const menuData = await fetch(`${util.baseURL}/admin/menu`).then(res => res.json());
    dispatch({
      type: 'GET_MENU_DATA',
      menuData: menuData[0]
    });
  }
}

// export const  getMenu = () => (dispatch) =>  {
//   fetch(`http://localhost:8000/api/v1/admin/menu`)
//     .then(res => res.json())
//       .then(menuData => {        
//         dispatch({
//           type: 'GET_MENU_DATA',
//           menuData
//         });
//       }); 
// }

export function updateMenu(menu, cb) {
  return async (dispatch) => {
    const updatedMenu = await fetch('http://localhost:8000/api/v1/admin/menu', {
      method: "PUT",
      headers: {
        "authorization": localStorage.getItem('hungerNamesJWT'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(menu)
    }).then(data => data.json());

    if (updatedMenu.error) {
      console.log(updatedMenu.error);
      cb(false)
    }
    dispatch({
      type: 'GET_MENU_DATA',
      menuData: updatedMenu
    });

    cb(true);
  }
}

export function getStudentFeedback(id, cb) {
  return dispatch => {
    fetch(`http://localhost:8000/api/v1/student/${id}/feedback`)
      .then(res => res.json())
      .then(data => {
        console.log(data, 'inside getStudentFeedback');
        dispatch({
          user: data,
          type: 'GET_USER_FEEDBACK'
        })
        cb(true);
      })
  }
}

export function getAttendenceAction() {
  return async (dispatch, getState) => {
    const userId = getState().currentUser._id
    const AttendanceData = await fetch(`${util.baseURL}/student/${userId}/attendance`, {
      method: "GET",
      headers: {
        "authorization": localStorage.getItem('hungerNamesJWT'),
        "Content-Type": "application/json"
      },
    }).then(res => res.json());
    dispatch({
      type: 'GET_USER_ATTENDANCE',
      attendance: AttendanceData,
    });
  }
}