/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import { formatCommentCount } from '../../api/helper';
import PostAction from './PostAction';

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
      <span className="post-actions-container">
        {/* View Comments */}
        <PostAction
          linkPath={`/${post.category}/${post.id}/comments`}
          iconName="comments outline"
          text={formatCommentCount(post.commentCount)}
        />

        {/* Edit */}
        <PostAction
          linkPath="#"
          iconName="edit outline"
          text="Edit"
        />

        {/* Delete */}
        <PostAction
          linkPath="#"
          iconName="trash alternate outline"
          text="Delete"
        />
      </span>
    </Grid.Column>
  );
}

PostDetails.propTypes = {
  post: PropTypes.object.isRequired,
  showBody: PropTypes.bool.isRequired,
};

export default PostDetails;
