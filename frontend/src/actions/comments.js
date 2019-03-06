import {
  createComment,
  getComments,
  voteComment,
  deleteComment,
  updateComment,
} from '../api/api';
import { handleReceivePost } from './posts';
import { randomId } from '../api/helper';


// #region CREATE
export const CREATE_COMMENT = 'CREATE_COMMENT';

function createCommentAction(comment) {
  return { type: CREATE_COMMENT, comment };
}

export function handleCreateComment(parentId, body, author) {
  return (dispatch) => {
    createComment({
      id: randomId(),
      timestamp: new Date().getTime(),
      parentId,
      body,
      author,
    }).then((comment) => {
      dispatch(createCommentAction(comment));
      dispatch(handleReceivePost(parentId));
    });
  };
}
// #endregion

// #region READ
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

function receiveCommentsAction(comments) {
  return { type: RECEIVE_COMMENTS, comments };
}

export function handleReceiveComments(postId) {
  return (dispatch) => {
    getComments(postId).then((comments) => {
      dispatch(receiveCommentsAction(comments));
    });
  };
}
// #endregion

// #region UPDATE
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

function updateCommentAction(comment) {
  return { type: UPDATE_COMMENT, comment };
}

export const VOTE = { UP: 'upVote', DOWN: 'downVote' };

/**
 * @param {VOTE} option option to vote.
 */
export function handleVoteComment(commentId, option) {
  return (dispatch) => {
    voteComment(commentId, option).then((response) => {
      dispatch(updateCommentAction(response));
    });
  };
}

export function handleUpdateComment(comment) {
  return (dispatch) => {
    updateComment(comment).then((response) => {
      dispatch(updateCommentAction(response));
    });
  };
}
// #endregion

// #region DELETE
export const DELETE_COMMENT = 'DELETE_COMMENT';

function deleteCommentAction(commentId) {
  return { type: DELETE_COMMENT, commentId };
}

export function handleDeleteComment(commentId) {
  return (dispatch) => {
    deleteComment(commentId).then((comment) => {
      dispatch(deleteCommentAction(commentId));
      dispatch(handleReceivePost(comment.parentId));
    });
  };
}
// #endregion
