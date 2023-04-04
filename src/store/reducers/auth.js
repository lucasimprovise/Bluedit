import {LOGIN_USER, LOGOUT_USER} from '../actions/auth';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  console.log('Reducer', action);
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
