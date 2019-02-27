/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import {
  Card,
  Grid,
  Icon,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { connect } from 'react-redux';
import { handleVotePost, handleReceivePost } from '../../actions/posts';
import { formatCommentCount } from '../../api/helper';
import './Post.css';
import PostEmpty from './PostEmpty';

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
    const { posts, postId } = this.props;
    const post = posts.find(p => p.id === postId);

    return post === undefined
      ? <PostEmpty />
      : (
        <Card fluid>
          <Grid columns={2} padded>
            <Grid.Row>
              {/* Score (1st column)  */}
              <Grid.Column width={1} textAlign="center" verticalAlign="middle">
                <Grid.Row>
                  <Icon link onClick={() => this.handleVote('upVote', post)} size="large" name="arrow up" />
                </Grid.Row>
                <Grid.Row style={{ margin: '.5em auto .5em auto' }}>
                  <span style={{ fontWeight: 600 }}>{post.voteScore}</span>
                </Grid.Row>
                <Grid.Row>
                  <Icon link onClick={() => this.handleVote('downVote', post)} size="large" name="arrow down" />
                </Grid.Row>
              </Grid.Column>
              {/* Post Details (2nd Column) */}
              <Grid.Column>
                {/* Title */}
                <Header as="h3">
                  <Link to={`/posts/${post.id}`} style={{ color: 'black' }}>{post.title}</Link>
                </Header>
                {/* Author, Category, Time */}
                <span style={{ display: 'block', paddingTop: '.25em' }}>
                  {'Posted by '}
                  <span className="authorName">{post.author}</span>
                  {' in '}
                  <Link to={`/${post.category}`}>{post.category}</Link>
                  {' • '}
                  <ReactTimeAgo date={new Date(post.timestamp)} />
                </span>
                {/* Actions */}
                <span className="actions">
                  {/* Comments */}
                  <span className="choice">
                    <Link to={`/posts/${post.id}/comments`}>
                      <Icon name="comments outline" />
                      {formatCommentCount(post.commentCount)}
                    </Link>
                  </span>
                  {/* Edit */}
                  <span className="choice">
                    <Icon name="edit outline" />
                    {'Edit'}
                  </span>
                  {/* Delete */}
                  <span className="choice">
                    <Icon name="trash alternate outline" />
                    {'Delete'}
                  </span>
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card>
      );
  }
}

Post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
};

function mapStateToProps({ posts }) {
  return {
    posts: Object.values(posts),
  };
}

export default connect(mapStateToProps)(Post);
