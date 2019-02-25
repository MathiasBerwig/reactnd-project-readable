import { RETRIEVE_PREF_ORDER_POSTS, SAVE_PREF_ORDER_POSTS } from '../actions/preferences';

export default function posts(state = {}, action) {
  switch (action.type) {
    case SAVE_PREF_ORDER_POSTS:
    case RETRIEVE_PREF_ORDER_POSTS:
      return action.orderBy;
    default:
      return state;
  }
}
