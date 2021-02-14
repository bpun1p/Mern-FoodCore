import {
  USER_SIGNUP,
  USER_LOGIN,
  USER_LOGOUT,
  USER_AUTHENTICATE,
} from '../actions/types';

const initialState = {
  login: {},
  signup: {},
  logout: {},
  authenticate: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case USER_SIGNUP:
      return {
        ...state,
        signup: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        logout: action.payload,
      };
    case USER_AUTHENTICATE:
      return {
        ...state,
        authenticate: action.payload,
      };
    default:
      return state;
  }
}
