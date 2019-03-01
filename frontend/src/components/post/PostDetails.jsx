/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import PostActions from './PostActions';

function PostDetails(props) {
  const { post, showBody } = props;
  return (
    <Grid.Column>
      {/* Title */}
      <Header as="h3" id="title">
        <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
      </Header>

      {/* Author, Category, Time */}
      <span className="postInfo">
        {'Posted by '}
        <span className="authorName">{post.author}</span>
        {' in '}
        <Link to={`/${post.category}`}>{post.category}</Link>
        {' • '}
        <ReactTimeAgo date={new Date(post.timestamp)} />
      </span>

      {/* Post body */}
      {showBody && <div className="bodyText">{post.body}</div>}

      {/* Actions */}
      <PostActions post={post} />
    </Grid.Column>
  );
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
  showBody: PropTypes.bool.isRequired,
};

export default PostDetails;
