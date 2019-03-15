const INIT_STATE = {
  currentUser: null,
  currentToken: localStorage.getItem('hungerNamesJWT') || null,
  menu: {},
  userFeedback: []
};

export default function rootReducer(state = INIT_STATE, action) {
  switch (action.type) {
    // case value:
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.user,
        currentToken: action.token,
      }
    case 'LOGOUT_USER':
      return {
        ...state,
        currentUser: null,
        currentToken: null,
      }
    // break;
    case 'GET_MENU_DATA':
      return {
        ...state,
        menu: action.menuData
      }
    case 'GET_USER_FEEDBACK': {
      return {
        ...state,
        userFeedback: action.user
      }
    }
    default:
      return state;
  }
}