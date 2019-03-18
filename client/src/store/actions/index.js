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

export function loginUserAction(data, cb) {
  return (dispatch) => {
    fetch(`${util.baseURL}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          let token = `Hungry ${data.token}`;
          localStorage.setItem('hungerNamesJWT', token) //will modify acc to server
          dispatch({
            type: "LOGIN_USER",
            user: data.user,
            token: token,
            authenticated: true
          });
          cb(true);
        } else if (data.error) {
          cb(false);
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
  return (dispatch) => {
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

export function postStaffRemark(data) {
  console.log('ins')
  return (dispath) => {
    fetch(`${util.baseURL}/staff/addRemarkStaff`,{
      method: "PUT",
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if(!data.error) {
        cb(true)
      } else cb(false)
    })
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
    const updatedMenu = await fetch(`${util.baseURL}/admin/menu`, {
      method: "PUT",
      headers: {
        "authorization": localStorage.getItem('hungerNamesJWT'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(menu)
    }).then(data => data.json());

    if (updatedMenu.error) {
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
    fetch(`${util.baseURL}/student/${id}/feedback`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          user: data,
          type: 'GET_USER_FEEDBACK'
        })
        cb(true);
      })
  }
}

export function postStudentFeedback(data, cb) {
  let id = '5c8894dbf2ad3e1b1f7f1c95'
  return dispatch => {
    fetch(`${util.baseURL}/student/${id}/feedback`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          cb(true)
        } else cb(false)
      })
  }
}

export function getAttendenceAction() {
  return async (dispatch, getState) => {
    const AttendanceData = await fetch(`${util.baseURL}/student/attendance`, {
      method: 'GET',
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

export function updateAttendenceAction(data) {
  return async (dispatch, getState) => {
    if (!getState().currentUser) return
    const userId = getState().currentUser._id
    const flag = await fetch(`${util.baseURL}/student/attendance`, {
      method: 'PUT',
      headers: {
        "authorization": localStorage.getItem('hungerNamesJWT'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then(res => res.json());
    if (!flag.error) {
      const AttendanceData = await fetch(`${util.baseURL}/student/attendance`, {
        method: 'GET',
        headers: {
          "authorization": localStorage.getItem('hungerNamesJWT'),
          "Content-Type": "application/json"
        },
      }).then(res => res.json());
      dispatch({
        type: 'GET_USER_ATTENDANCE',
        attendance: AttendanceData,
      });
      cb(true);
    }
    cb(false)
  }
}

export function getAllFeedback() {
  return async (dispatch) => {
    const feedbackFetch = await fetch(`http://localhost:8000/api/v1/student/feedback`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('hungernamesJWT')
      },
    }).then(res => res.json());

    const feedback = feedbackFetch.feedback.reduce((acc, curr) => {
      acc[curr.date] = feedbackFetch.feedback.filter((val) => val.date === curr.date);
      return acc;
    }, {});

    dispatch({
      type: 'GET_ALL_FEEDBACK',
      feedback
    })
  }
}

// fetching all student list from db
export function getallstudentslist() {
  return dispatch => {
    fetch(`${util.baseURL}/student`)
    .then(res => res.json())
    .then(students => {
      dispatch({
        students: students.user,
        type: "GET_ALL_STUDENTS_LIST"
      })
    })
  }
}

export function verifyTokenAction(token) {
  return async (dispatch) => {

    const verifyedUser = await fetch(`http://localhost:8000/api/v1/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
    }).then(res => res.json());

    if (!verifyedUser.error) {
      let token = `Hungry ${verifyedUser.token}`;
      localStorage.setItem('hungerNamesJWT', token) //will modify acc to server
      dispatch({
        type: "LOGIN_USER",
        user: verifyedUser.user,
        token: token,
      });
    }
  }
}

export function verifyDataTokenAction(token) {
  return async (dispatch) => {
    const verifyedUser = await fetch(`http://localhost:8000/api/v1/verify`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
    }).then(res => res.json());
    
    if (!verifyedUser.error) {
      let token = `Hungry ${data.token}`;
      localStorage.setItem('hungerNamesJWT', token) //will modify acc to server
      dispatch({
        type: "LOGIN_USER",
        user: data.user,
        token: token,
      });
    }
  }    
}

// removing a particular user from db
export function removeStudent(id) {
  return async dispatch => {
    await fetch(`${util.baseURL}/student/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(users => {
      console.log(users, 'inside remove student/action');
    })
  }
}
