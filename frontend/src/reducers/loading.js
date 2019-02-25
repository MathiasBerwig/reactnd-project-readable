import { SHOW_LOADING, HIDE_LOADING } from '../actions/loading';

export default function loading(state = {}, action) {
  switch (action.type) {
    case HIDE_LOADING:
    case SHOW_LOADING:
      return action.show;
    default:
      return state;
  }
}
