/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { PropTypes } from 'prop-types';
import { Container } from 'semantic-ui-react';
import Post from './Post';

export default function SinglePostContainer({ match }) {
  return (
    <Container className="post-container">
      <Post postId={match.params.postId} />
    </Container>
  );
}

SinglePostContainer.propTypes = {
  match: PropTypes.object.isRequired,
};
