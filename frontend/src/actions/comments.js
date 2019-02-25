export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function receiveComments(comments) {
  return { type: RECEIVE_COMMENTS, comments };
}
