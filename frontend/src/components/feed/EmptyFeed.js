/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Segment,
  Icon,
  Header,
  Button,
  Loader,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import EditPost from '../edit-post/EditPost';

function EmptyFeed(props) {
  const { loading } = props;

  return loading
    ? (<Loader active>Loading Posts</Loader>)
    : (
      <Segment basic placeholder>
        <Header icon textAlign="center">
          <Icon name="add circle" />
          <Header.Content>
            No posts here.
            <Header.Subheader>Write the first one ;)</Header.Subheader>
          </Header.Content>
        </Header>
        <Segment.Inline>
          <EditPost trigger={(<Button primary as={Link} to="/new-post">New Post</Button>)} />
          <Button as={Link} to="/">Show all posts</Button>
        </Segment.Inline>
      </Segment>
    );
}

EmptyFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps({ loading }) {
  return {
    loading: typeof loading === 'object' || loading,
  };
}

export default connect(mapStateToProps)(EmptyFeed);
