/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import {
  Card,
  Grid,
} from 'semantic-ui-react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleVotePost, handleReceivePost } from '../../actions/posts';
import './Post.css';
import EmptyPost from './EmptyPost';
import PostScore from './PostScore';
import PostDetails from './PostDetails';
import PostComments from './PostComments';

class Post extends PureComponent {
  componentDidMount() {
    const { postId, posts, dispatch } = this.props;
    if (posts === undefined || posts.length === 0) {
      dispatch(handleReceivePost(postId));
    }
  }

  handleVote = (option, post) => {
    const { dispatch } = this.props;
    dispatch(handleVotePost(post.id, option));
  };

  render() {
    const { posts, postId, match } = this.props;
    const post = posts.find(p => p.id === postId);

    return post === undefined || post.deleted
      ? <EmptyPost />
      : (
        <Card fluid>
          <Grid columns={2} padded style={{ paddingTop: '.5em', paddingBottom: '.5em' }}>
            {/* Score and Details */}
            <Grid.Row>
              {/* 1st column */}
              <PostScore handleVote={this.handleVote} post={post} />
              {/* 2nd column */}
              <PostDetails post={post} showBody={match.params.postId !== undefined} />
            </Grid.Row>

            {/* Comments (2nd row) */}
            <Route
              path={`${match.path}/comments`}
              render={() => (
                <Grid.Row>
                  <Grid.Column width="1" />
                  <Grid.Column>
                    <PostComments />
                  </Grid.Column>
                </Grid.Row>
              )}
            />
          </Grid>
        </Card>
      );
  }
}

Post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
};

function mapStateToProps({ posts }) {
  return {
    posts,
  };
}

export default withRouter(connect(mapStateToProps)(Post));
