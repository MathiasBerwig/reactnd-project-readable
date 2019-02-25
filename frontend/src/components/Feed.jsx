/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { handleReceivePosts } from '../actions/posts';
import Post from './Post';

class Feed extends Component {
  componentDidMount() {
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps) {
    const { location: { pathname } } = this.props;
    // Check if user has selected an new category
    if (prevProps.location.pathname !== pathname) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    const { dispatch, location: { pathname } } = this.props;
    const category = pathname.substr(1);
    dispatch(handleReceivePosts(category));
  }

  render() {
    const { posts } = this.props;

    return (
      <Container style={{ marginTop: '7em' }}>
        <List divided relaxed>
          {
            posts.map(post => (
              <List.Item key={post.id}>
                <Post post={post} />
              </List.Item>
            ))
          }
        </List>
      </Container>
    );
  }
}

Feed.propTypes = {
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

function mapStateToProps({ posts }) {
  return {
    posts: Object.values(posts),
  };
}

export default withRouter(connect(mapStateToProps)(Feed));
