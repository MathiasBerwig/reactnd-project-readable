import { getPosts, getPostsByCategory } from '../api/api';
import { showLoading, hideLoading } from './loading';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';

export function receivePosts(posts) {
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
      dispatch(receivePosts(posts));
      dispatch(hideLoading());
    });
  };
}
