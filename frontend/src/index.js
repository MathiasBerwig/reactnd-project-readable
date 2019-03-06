/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import App from './components/app/App';
import reducer from './reducers';
import middleware from './middleware';

const store = createStore(reducer, middleware);

JavascriptTimeAgo.locale(en);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
