import { RETRIEVE_PREF_ORDER_POSTS, SAVE_PREF_ORDER_POSTS } from '../actions/preferences';

export default function preferences(state = {}, action) {
  switch (action.type) {
    case SAVE_PREF_ORDER_POSTS:
    case RETRIEVE_PREF_ORDER_POSTS:
      return {
        orderBy: action.orderBy,
      };
    default:
      return state;
  }
}
