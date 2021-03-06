import { getCategories } from '../api/api';

// #region READ
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

function receiveCategories(categories) {
  return { type: RECEIVE_CATEGORIES, categories };
}

export function handleReceiveCategories() {
  return dispatch => getCategories().then((categories) => {
    dispatch(receiveCategories(categories));
  });
}
// #endregion
