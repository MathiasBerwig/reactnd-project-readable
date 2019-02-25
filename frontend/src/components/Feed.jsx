/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { List, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { handleReceivePosts } from '../actions/posts';
import Post from './Post';
import FeedEmpty from './FeedEmpty';

class Feed extends PureComponent {
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
    const { dispatch } = this.props;
    const category = this.getCurrentCategory();
    dispatch(handleReceivePosts(category));
  }

  getCurrentCategory() {
    const { location: { pathname } } = this.props;
    return pathname.substr(1);
  }

  render() {
    const { posts, isLoading } = this.props;

    return (
      <Container style={{ paddingTop: '7em' }}>
        {
          posts.length === 0
            ? <FeedEmpty loading={isLoading} />
            : (
              <List divided relaxed>
                {
                  posts.map(post => (
                    <List.Item key={post.id}>
                      <Post post={post} />
                    </List.Item>
                  ))
                }
              </List>
            )
        }
      </Container>
    );
  }
}

Feed.propTypes = {
  posts: PropTypes.array,
  isLoading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

Feed.defaultProps = {
  isLoading: true,
  posts: [],
};

function mapStateToProps({ posts, loading }) {
  return {
    posts: Object.values(posts),
    isLoading: loading.show,
  };
}

export default withRouter(connect(mapStateToProps)(Feed));
