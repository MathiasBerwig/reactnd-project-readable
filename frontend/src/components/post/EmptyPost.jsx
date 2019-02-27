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

function EmptyPost(props) {
  const { loading } = props;

  return loading
    ? (<Loader active>Loading your post</Loader>)
    : (
      <Segment basic placeholder>
        <Header icon textAlign="center">
          <Icon name="spy" />
          <Header.Content>
            We found no post here.
          </Header.Content>
        </Header>
        <Segment.Inline>
          <Button primary as={Link} to="/">Show all posts</Button>
        </Segment.Inline>
      </Segment>
    );
}

EmptyPost.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps({ loading }) {
  return {
    loading: typeof loading === 'object' || loading,
  };
}

export default connect(mapStateToProps)(EmptyPost);
