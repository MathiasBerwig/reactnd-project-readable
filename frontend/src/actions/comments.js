import {
  getComments,
  createComment,
  voteComment,
  deleteComment,
} from '../api/api';
import { handleReceivePost } from './posts';
import { randomId } from '../api/helper';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const COMMENT_UP_VOTE_VALUE = 'upVote';
export const COMMENT_DOWN_VOTE_VALUE = 'downVote';


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

function updateCommentAction(comment) {
  return { type: UPDATE_COMMENT, comment };
}

export function handleVoteComment(commentId, option) {
  return (dispatch) => {
    voteComment(commentId, option).then((post) => {
      dispatch(updateCommentAction(post));
    });
  };
}

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
