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
import { handleVotePost } from '../actions/posts';
import './Post.css';

export default class Post extends PureComponent {
  handleVote = (option, post) => {
    const { dispatch } = this.props;
    dispatch(handleVotePost(post.id, option));
  };

  render() {
    const { post } = this.props;

    return (
      <Card fluid>
        <Grid columns={2} padded>
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
            <Header as="h3">{post.title}</Header>
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
                <Icon name="comments outline" />
                {`${post.commentCount} comments`}
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
        </Grid>
      </Card>
    );
  }
}

Post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
