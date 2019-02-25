import { combineReducers } from 'redux';
import categories from './categories';
import comments from './comments';
import loading from './loading';
import posts from './posts';

export default combineReducers({
  categories,
  comments,
  loading,
  posts,
});
