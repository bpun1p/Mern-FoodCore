import {
  FETCH_USER_POSTS,
  POST_TO_USER,
  FETCH_ALL_POSTS,
  POST_TO_ALL,
} from '../actions/types';

const initialState = {
  fetchUsersPosts: [],
  fetchAllPosts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_POSTS:
      return {
        ...state,
        fetchUsersPosts: action.payload,
      };
    case POST_TO_USER:
      return {
        ...state,
      };
    case FETCH_ALL_POSTS:
      return {
        ...state,
        fetchAllPosts: action.payload,
      };
    case POST_TO_ALL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
