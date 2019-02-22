import { receiveCategories } from './categories';
import { getInitialData } from '../api';
import { receivePosts } from './posts';

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ posts, categories }) => {
        dispatch(receivePosts(posts));
        dispatch(receiveCategories(categories));
      });
  };
}
