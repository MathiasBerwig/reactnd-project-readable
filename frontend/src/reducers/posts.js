import {
  RECEIVE_POSTS,
  UPDATE_POST,
  RECEIVE_POST,
  DELETE_POST,
  CREATE_POST,
} from '../actions/posts';

export default function posts(state = {}, action) {
  switch (action.type) {
    case CREATE_POST: {
      return [
        ...state,
        action.post,
      ];
    }
    case RECEIVE_POST: {
      return action.post ? [action.post] : [];
    }
    case RECEIVE_POSTS:
      return action.posts;
    case UPDATE_POST:
      return [
        ...state.filter(p => p.id !== action.post.id),
        action.post,
      ];
    case DELETE_POST: {
      return [
        ...state.filter(p => p.id !== action.postId),
      ];
    }
    default:
      return state;
  }
}
