/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { List, Container, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { handleReceivePosts } from '../../actions/posts';
import { orderAndFilterPosts } from '../../api/helper';
import Post from '../post/Post';
import EmptyFeed from './EmptyFeed';

class Feed extends PureComponent {
  componentDidMount() {
    this.routeChanged();
  }

  componentDidUpdate(prevProps) {
    const { location: { pathname } } = this.props;
    // Check if user has selected an new category
    if (prevProps.location.pathname !== pathname) {
      this.routeChanged();
    }
  }

  /**
   * Returns the current category from the browser path.
   * If in "All posts", an empty string is returned.
   */
  getCurrentCategoryFromPath() {
    const { location: { pathname } } = this.props;
    return pathname.substr(1);
  }

  /**
   * Called when the URL changes and new posts need to be loaded.
   */
  routeChanged() {
    const { dispatch } = this.props;
    const category = this.getCurrentCategoryFromPath();
    dispatch(handleReceivePosts(category));
  }

  render() {
    const { posts, orderBy } = this.props;
    const currentCategory = this.getCurrentCategoryFromPath();
    const orderedPosts = orderAndFilterPosts(posts, currentCategory, orderBy);

    return (
      <Container className="post-container">
        <Header as="h1">{this.getCurrentCategoryFromPath() || 'All Posts'}</Header>
        {
          orderedPosts === undefined || orderedPosts.length === 0
            ? <EmptyFeed />
            : (
              <List relaxed>
                {
                  orderedPosts.map(p => (
                    <List.Item key={p.id}>
                      <Post postId={p.id} />
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
    posts,
    categories,
    orderBy: preferences.orderBy,
  };
}

export default withRouter(connect(mapStateToProps)(Feed));
