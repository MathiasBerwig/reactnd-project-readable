import {
  getPost,
  getPosts,
  getPostsByCategory,
  votePost,
  updatePost,
  deletePost,
  createPost,
} from '../api/api';
import { showLoading, hideLoading } from './loading';
import { randomId } from '../api/helper';

// #region CREATE
export const CREATE_POST = 'CREATE_POST';

function createPostAction(post) {
  return { type: CREATE_POST, post };
}

export function handleCreatePost(post) {
  const {
    author, title, body, category,
  } = post;
  return (dispatch) => {
    createPost({
      id: randomId(),
      timestamp: new Date().getTime(),
      author,
      title,
      body,
      category,
    }).then((p) => {
      dispatch(createPostAction(p));
    });
  };
}
// #endregion

// #region READ
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function receivePostAction(post) {
  return { type: RECEIVE_POST, post };
}

export function handleReceivePost(postId) {
  return (dispatch) => {
    dispatch(showLoading());
    getPost(postId).then((post) => {
      dispatch(receivePostAction(post));
      dispatch(hideLoading());
    });
  };
}

function receivePostsAction(posts) {
  return { type: RECEIVE_POSTS, posts };
}

export function handleReceivePosts(category) {
  return (dispatch) => {
    dispatch(showLoading());
    (
      category === undefined || category === ''
        ? getPosts()
        : getPostsByCategory(category)
    ).then((posts) => {
      dispatch(receivePostsAction(posts));
      dispatch(hideLoading());
    });
  };
}
// #endregion

// #region UPDATE
export const UPDATE_POST = 'UPDATE_POST';

function updatePostAction(post) {
  return { type: UPDATE_POST, post };
}

export function handleUpdatePost(post) {
  return (dispatch) => {
    updatePost(post).then((response) => {
      dispatch(updatePostAction(response));
    });
  };
}

export const POST_UP_VOTE_VALUE = 'upVote';
export const POST_DOWN_VOTE_VALUE = 'downVote';

export function handleVotePost(postId, option) {
  return (dispatch) => {
    votePost(postId, option).then((post) => {
      dispatch(updatePostAction(post));
    });
  };
}
// #endregion

// #region DELETE
export const DELETE_POST = 'DELETE_POST';

function deletePostAction(postId) {
  return { type: DELETE_POST, postId };
}

export function handleDeletePost(postId) {
  return (dispatch) => {
    deletePost(postId).then(() => {
      dispatch(deletePostAction(postId));
    });
  };
}
// #endregion
