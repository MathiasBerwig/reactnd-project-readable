/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';
import { VOTE as POST_VOTE } from '../../actions/posts';

function PostScore(props) {
  const { post, handleVote } = props;

  return (
    <Grid.Column width={1} textAlign="center" verticalAlign="middle">
      {/* UpVote Action */}
      <Grid.Row>
        <Icon link size="large" name="arrow up" onClick={() => handleVote(POST_VOTE.UP, post)} />
      </Grid.Row>
      {/* Score text */}
      <Grid.Row style={{ margin: '.5em auto .5em auto' }}>
        <span style={{ fontWeight: 600 }}>{post.voteScore}</span>
      </Grid.Row>
      {/* DownVote Action */}
      <Grid.Row>
        <Icon link size="large" name="arrow down" onClick={() => handleVote(POST_VOTE.DOWN, post)} />
      </Grid.Row>
    </Grid.Column>
  );
}

PostScore.propTypes = {
  post: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired,
};

export default PostScore;
