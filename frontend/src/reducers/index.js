import { combineReducers } from 'redux';
import preferences from './preferences';
import categories from './categories';
import comments from './comments';
import loading from './loading';
import posts from './posts';

export default combineReducers({
  preferences,
  categories,
  comments,
  loading,
  posts,
});
