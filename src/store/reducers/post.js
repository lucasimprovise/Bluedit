import {CREATE_POST} from '../actions/post';

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.post],
      };
    default:
      return state;
  }
};
