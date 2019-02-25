import { getPosts, getPostsByCategory } from '../api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
}

export function handleReceivePosts(category) {
  return dispatch => (
    category === undefined || category === ''
      ? getPosts()
      : getPostsByCategory(category)
  ).then((posts) => {
    dispatch(receivePosts(posts));
  });
}

/* function addPost(post) {
  return {
    type: CREATE_POST,
    post,
  };
} */

/* export function handleAddPost(id, timestamp, title, body, author, category) {
  return dispatch => createPost({
    id,
    timestamp,
    title,
    body,
    author,
    category,
  }).then(post => dispatch(createPost(post)));
} */
