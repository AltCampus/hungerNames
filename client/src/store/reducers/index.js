
const INIT_STATE = {
  currentUser: JSON.parse(localStorage.getItem('hungerUser')) || null,
  currentToken: localStorage.getItem('hungerNamesJWT') || null,
  isAuthenticated: (localStorage.getItem('hungerNamesJWT')) ? true : false,
  menu: {},
  userFeedback: [],
  userAttendance: [],
  allUserFeedback: [],
  listAllStudents: [],
  singleUserFeedback: [],
  attendees: {},
  error: {},
  message: ''
};

// async function verifyTokenAction(token) {
//   if (!token) return
//   const verifyedUser = await fetch(`http://localhost:8000/api/v1/verify`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'authorization': token
//     },
//   }).then(res => res.json());

//   if (!verifyedUser.error) {
//     let token = `Hungry ${data.token}`;
//     localStorage.setItem('hungerNamesJWT', token) //will modify acc to server
//     INIT_STATE.currentUser = verifyedUser.user;
//     INIT_STATE.currentToken - verifyTokenAction;
//   }
// }

// verifyTokenAction(INIT_STATE.currentToken)

export default function rootReducer(state = INIT_STATE, action) {
  switch (action.type) {
    // case value:
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.user,
        currentToken: action.token,
        isAuthenticated: action.authenticated,
        message: action.message
      }
    case 'LOGIN_FAILED': {
      console.log(action.data, 'in reducer');
      return {
        ...state,
        error: action.data
      }
    }
    case 'LOGOUT_USER':
      return {
        ...state,
        currentUser: null,
        currentToken: null,
        isAuthenticated: false,
      }
    // break;
    case 'GET_MENU_DATA':
      return {
        ...state,
        menu: action.menuData
      }
    case 'GET_USER_FEEDBACK':
      return {
        ...state,
        userFeedback: action.user
      }

    case 'GET_USER_ATTENDANCE':
      return {
        ...state,
        userAttendance: action.attendance.attendance
      }

    case 'GET_ALL_FEEDBACK':
      return {
        ...state,
        allUserFeedback: action.feedback
      }

    case 'GET_ALL_STUDENTS_LIST': {
      return {
        ...state,
        listAllStudents: action.students
      }
    }
    case 'REMAINING_STUDENTS': {
      return {
        ...state,
        listAllStudents: action.users
      }
    }
    case 'GET_SINGLE_STUDENT_FEEDBACK': {
      return {
        ...state,
        singleUserFeedback: action.feedback
      }
    }
    case 'GET_ATTENDEES': {
      return {
        ...state,
        attendees: action.data
      }
    }
    default:
      return state;
  }
}