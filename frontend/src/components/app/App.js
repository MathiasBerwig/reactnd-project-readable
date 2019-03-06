/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import { handleReceiveCategories } from '../../actions/categories';
import './App.css';
import Feed from '../feed/Feed';
import NavMenu from '../menu/NavMenu';
import SinglePostContainer from '../post/SinglePostContainer';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleReceiveCategories());
  }

  render() {
    const { loading } = this.props;

    return (
      <Router>
        {loading === true
          ? (
            <Dimmer active>
              <Loader />
            </Dimmer>
          )
          : (
            <Fragment>
              <NavMenu />
              {/* Show Feed with all posts */}
              <Route path="/" exact component={Feed} />
              {/* Show Feed with category-specific posts */}
              <Route path="/:category" exact component={Feed} />
              {/* Show specific post (contains nested routes) */}
              <Route path="/:category/:postId" component={SinglePostContainer} />
            </Fragment>
          )}
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function isEmpty(obj) {
  return !obj || obj.length === 0;
}

function mapStateToProps({ categories }) {
  return {
    loading: isEmpty(categories),
  };
}

export default connect(mapStateToProps)(App);
