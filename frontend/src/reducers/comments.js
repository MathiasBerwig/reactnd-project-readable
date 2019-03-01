import {
  RECEIVE_COMMENTS,
  UPDATE_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from '../actions/comments';

export default function comments(state = {}, action) {
  switch (action.type) {
    case CREATE_COMMENT:
      return [
        ...state,
        action.comment,
      ];
    case UPDATE_COMMENT:
      return [
        ...state.filter(c => c.id !== action.comment.id),
        action.comment,
      ];
    case DELETE_COMMENT:
      return [
        ...state.filter(c => c.id !== action.commentId),
      ];
    case RECEIVE_COMMENTS:
      return action.comments.filter(c => !c.deleted);
    default:
      return state;
  }
}
