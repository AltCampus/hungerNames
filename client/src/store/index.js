import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
// import 'babel-polyfill';

const INIT_STATE = {
  currentUser: JSON.parse(localStorage.getItem('hungryUser')) || null,
  currentToken: localStorage.getItem('hungerNamesJWT') || null,
  isAuthenticated: (localStorage.getItem('hungerNamesJWT')) ? true : false,
  menu: {},
  userFeedback: [],
  userAttendance: [],
  allUserFeedback: [],
  listAllStudents: [],
  singleUserFeedback: [],
  attendees: {}
};
console.log(INIT_STATE)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,INIT_STATE, composeEnhancers(applyMiddleware(thunk)));

export default store;