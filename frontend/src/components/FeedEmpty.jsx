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

function FeedEmpty(props) {
  const { loading } = props;

  return loading
    ? (<Loader active>Loading Posts</Loader>)
    : (
      <Segment basic placeholder>
        <Header icon textAlign="center">
          <Icon name="add circle" />
          <Header.Content>
            No posts are listed for this category.
          </Header.Content>
        </Header>
        <Segment.Inline>
          <Button primary as={Link} to="/new-post">Create Post</Button>
          <Button as={Link} to="/">Show all posts</Button>
        </Segment.Inline>
      </Segment>
    );
}

FeedEmpty.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps({ loading }) {
  return {
    loading: typeof loading === 'object' || loading,
  };
}

export default connect(mapStateToProps)(FeedEmpty);
