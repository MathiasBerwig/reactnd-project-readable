/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { List, Container, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { handleReceivePosts } from '../actions/posts';
import { orderPosts } from '../api/helper';
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
    const category = this.getCurrentCategoryFromPath();
    dispatch(handleReceivePosts(category));
  }

  getCurrentCategoryFromPath() {
    const { location: { pathname } } = this.props;
    return pathname.substr(1);
  }

  render() {
    const { posts, orderBy, dispatch } = this.props;
    const orderedPosts = orderPosts(posts, orderBy);

    return (
      <Container style={{ paddingTop: '7em' }}>
        <Header as="h1">{this.getCurrentCategoryFromPath() || 'All Posts'}</Header>
        {
          orderedPosts === undefined || orderedPosts.length === 0
            ? <FeedEmpty />
            : (
              <List relaxed>
                {
                  orderedPosts.map(p => (
                    <List.Item key={p.id}>
                      <Post post={p} dispatch={dispatch} />
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
  orderBy: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

Feed.defaultProps = {
  posts: [],
  orderBy: 'score',
};

function mapStateToProps({ categories, posts, preferences = {} }) {
  return {
    categories,
    orderBy: preferences.orderBy,
    posts: Object.values(posts),
  };
}

export default withRouter(connect(mapStateToProps)(Feed));
