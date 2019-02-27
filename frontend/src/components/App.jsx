/* eslint-disable react/forbid-prop-types */

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import { handleReceiveCategories } from '../actions/categories';
import './App.css';
import Feed from './Feed';
import NavMenu from './NavMenu';
import SinglePostContainer from './SinglePostContainer';

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
              <Route path="/" exact component={Feed} />
              <Route path="/posts/:postId" component={SinglePostContainer} />
              <Route path="/:category" exact component={Feed} />
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
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function mapStateToProps({ categories }) {
  return {
    loading: isEmpty(categories),
  };
}

export default connect(mapStateToProps)(App);
