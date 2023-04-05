import { GET_POSTS } from '../actions/post';

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };

    default:
      return state;
  }
};
