import { PREF_ORDER_BY, savePreference, retrievePreference } from '../api/preferences';

export const SAVE_PREF_ORDER_POSTS = 'SAVE_PREF_ORDER_POSTS';
export const RETRIEVE_PREF_ORDER_POSTS = 'RETRIEVE_PREF_ORDER_POSTS';

function savePreferenceOrderPosts(orderBy) {
  return { type: SAVE_PREF_ORDER_POSTS, orderBy };
}

export function handleSavePreferenceOrderPosts(orderBy) {
  return (dispatch) => {
    savePreference(PREF_ORDER_BY, orderBy);
    dispatch(savePreferenceOrderPosts(orderBy));
  };
}

function retrievePreferenceOrderPosts() {
  return { type: RETRIEVE_PREF_ORDER_POSTS };
}

export function handleRetrievePreferenceOrderPosts() {
  return (dispatch) => {
    const pref = retrievePreference(PREF_ORDER_BY, 'Date');
    dispatch(retrievePreferenceOrderPosts(pref));
  };
}
