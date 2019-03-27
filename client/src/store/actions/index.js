import { util } from "../../util";
import socket from "../../modules/socketIO";

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
  return (dispatch, getState) => {
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
          localStorage.setItem('hungryUser',JSON.stringify(data.user))
          localStorage.setItem('hungerNamesJWT', token) //will modify acc to server
          console.log(data, 'after login')
          dispatch({
            type: "LOGIN_USER",
            user: data.user,
            token: token,
            authenticated: true,
            message: data.message
          });

          // handling work for socket.io
          const { name, isAdmin, isStudent, isKitchenStaff } = getState().currentUser;

          let role;

          if (isAdmin) {
            role = 'admin';
          } else if (isKitchenStaff) {
            role = 'kitchenStaff'
          } else {
            role = 'student'
          }

          socket.emit('login', {
            name: name,
            role
          })

          cb(true);
        } else {
          dispatch({
            type: "LOGIN_FAILED",
            data
          })
          cb(false);
        }
      });
  };
};

export function logoutUserAction(cb) {
  return (dispatch) => {
    localStorage.removeItem('hungryUser');
    localStorage.removeItem('hungerNamesJWT');
    dispatch({
      type: "LOGOUT_USER",
    });
    cb(true)
  };
};

export function registerUserAction(data, cb) {
  return async (dispatch) => {
    await fetch(`${util.baseURL}/student/register`, {
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


export function getMenu(cb) {
  return async (dispatch) => {
    const menuData = await fetch(`${util.baseURL}/admin/menu`).then(res => res.json());
    dispatch({
      type: 'GET_MENU_DATA',
      menuData: menuData[0]
    });
    cb(true);
  }
}

export function postStaffRemark(data, cb) {
  return (dispath) => {
    fetch(`${util.baseURL}/staff/menu`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          cb(data, true)
        } else cb(data, false)
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

export function postStudentFeedback(data, id, cb) {
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
          socket.emit('feedbackPosted', {});

          cb(true)
        } else cb(false)
      })
  }
}

export function getAttendenceAction(cb) {
  return async (dispatch, getState) => {
    const AttendanceData = await fetch(`${util.baseURL}/student/attendance`, {
      method: 'GET',
      headers: {
        "authorization": localStorage.getItem('hungerNamesJWT'),
        "Content-Type": "application/json"
      },
    }).then(res => res.json());
    if (AttendanceData.error) {
      cb(false);
    }
    dispatch({
      type: 'GET_USER_ATTENDANCE',
      attendance: AttendanceData,
    });
    cb(true);
  }
}

export function updateAttendenceAction(data, cb) {
  return async (dispatch, getState) => {
    if (!getState().currentUser) return
    // const userId = getState().currentUser._id
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

export function getAllFeedback(cb) {
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
    if (feedbackFetch.message) {
      cb(false)
    }
    dispatch({
      type: 'GET_ALL_FEEDBACK',
      feedback
    })
    cb(true)
  }
}

// fetching all student list from db
export function getallstudentslist(cb) {
  return dispatch => {
    fetch(`${util.baseURL}/student`)
    .then(res => res.json())
    .then(students => {
      if (students.message) return;
      if (!students.error) {
        dispatch({
          students: students.user,
          type: "GET_ALL_STUDENTS_LIST"
        })
        cb(true);
      }
      cb(false);
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
        authenticated: true,
      });

    } else {
      dispatch({
        type: "LOGOUT_USER",
      });
    }
  }
}


// export function verifyDataTokenAction(token) {
//   return async (dispatch) => {
//     const verifyedUser = await fetch(`http://localhost:8000/api/v1/verify`,{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'authorization': token
//       },
//     }).then(res => res.json());    
//     if (!verifyedUser.error) {
//       let token = `Hungry ${data.token}`;
//       localStorage.setItem('hungerNamesJWT', token) //will modify acc to server
//       dispatch({
//         type: "LOGIN_USER",
//         user: data.user,
//         token: token,        
//       });
//     }
//   }    
// }

// removing a particular user from db
export function removeStudent(id, cb) {
  return async dispatch => {
    await fetch(`${util.baseURL}/student/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(users => {
        if (users.message) return;
        if (!users.error) {
          dispatch({
            type: "REMAINING_STUDENTS",
            users: users.user
          })
          cb(true)
        } else {
          cb(false)
        }
      })
  }
}

// getting feedback of a particular student from db
export function getSingleStudentFeedback(id, cb) {
  return async (dispatch) => {
    await fetch(`${util.baseURL}/student/${id}/feedback`)
      .then(res => res.json())
      .then(feedback => {
        if (feedback.message) return;
        if (feedback.error) {
          cb(false);
        }
        dispatch({
          type: "GET_SINGLE_STUDENT_FEEDBACK",
          feedback: feedback.student.feedback
        })
        cb(true);
      })
  }
}
//get attendees
export function getAttendeesAction(id) {
  return (dispatch) => {
    fetch(`${util.baseURL}/student/attendees`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: "GET_ATTENDEES",
          data
        })
      })
  }
}

// getting forgot password 
export function forgotPassword(data, cb) {
  return (dispatch) => {
    fetch(`${util.baseURL}/forgotpassword`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(user => {
      if (!user.error) {
        dispatch({
          type: "FORGOT_PASSWORD_SUCCESS",
          user
        })
        cb(true);
      } else {
        dispatch({
          type: "FORGOT_PASSWORD_FAIL",
          user
        })
        cb(false)
      }
    })
  }
}

// forget password
export function resetPassword(data, cb) {
  return dispatch => {
    fetch(`${util.baseURL}/resetpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(user => {
      console.log(user, 'getting user from db')
      if (!user.error) {
        dispatch({
          type: "RESET_PASSWORD_SUCCESS",
          user
        })
        cb(true);
      } else {
        dispatch({
          type: "RESET_PASSWORD_FAIL",
          user
        })
        cb(false);
      }
    })
  }
}