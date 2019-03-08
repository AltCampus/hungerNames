const INIT_STATE = {
  currentUser:localStorage.getItem('hungerNamesJWT') ||null,
   
};

export default function rootReducer(state = INIT_STATE, action) {
  switch (action.type) {
    // case value:
    case LOGIN_USER:
      return { ...state, currentUser: action.data }
    case LOGOUT_USER:
      return { ...state, currentUser: null }
    // break;

    default:
      return state;
  }
}