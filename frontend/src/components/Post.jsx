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
          <Grid.Column width={1} textAlign="center">
            <Grid.Row>
              <Icon link onClick={() => this.handleVote('upVote', post)} name="arrow circle up" />
            </Grid.Row>
            <Grid.Row style={{ margin: '.5em' }}>
              <span style={{ fontWeight: 600 }}>{post.voteScore}</span>
            </Grid.Row>
            <Grid.Row>
              <Icon link onClick={() => this.handleVote('downVote', post)} name="arrow circle down" />
            </Grid.Row>
          </Grid.Column>
          {/* Post Details (2nd Column) */}
          <Grid.Column>
            <Header as="h3">{post.title}</Header>
            <span style={{ display: 'block', paddingTop: '.25em' }}>
              {'Posted by '}
              <span style={{ fontWeight: 500 }}>{post.author}</span>
              {' in '}
              <Link to={`/${post.category}`}>{post.category}</Link>
              {' • '}
              <ReactTimeAgo date={new Date(post.timestamp)} />
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
