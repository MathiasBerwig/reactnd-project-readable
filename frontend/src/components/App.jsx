import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import { handleInitialData } from '../actions/shared';
import { Dimmer, Loader } from 'semantic-ui-react'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;
    
    return (
      <Router>
        <Fragment>
          <div className="container">
            {loading === true
              ? (
                <Dimmer active>
                  <Loader />
                </Dimmer>
              )
              : (
                <div>
                  <Route path="/" exact component={Dashboard} />
                </div>
              )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps({ posts, categories }) {
  return {
    loading: isEmpty(posts) || isEmpty(categories)
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export default connect(mapStateToProps)(App);
