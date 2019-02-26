import { RECEIVE_POSTS, UPDATE_POST } from '../actions/posts';

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case UPDATE_POST:
      return [
        ...state.filter(p => p.id !== action.post.id),
        action.post,
      ];
    default:
      return state;
  }
}
