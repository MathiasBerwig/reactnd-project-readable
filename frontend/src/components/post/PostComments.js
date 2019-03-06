/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Comment, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import {
  handleReceiveComments,
  handleVoteComment,
  VOTE as COMMENT_VOTE,
  handleDeleteComment,
} from '../../actions/comments';
import { formatScoreCount, orderCommentsByScore } from '../../api/helper';
import EditComment from './edit-comment/EditComment';
import PostCommentsForm from './PostCommentsForm';

class PostComments extends PureComponent {
  componentDidMount() {
    const { dispatch, post: { id } } = this.props;
    dispatch(handleReceiveComments(id));
  }

  handleDelete = (commentId) => {
    const { dispatch } = this.props;
    dispatch(handleDeleteComment(commentId));
  }

  handleVote = (commentId, option) => {
    const { dispatch } = this.props;
    dispatch(handleVoteComment(commentId, option));
  }

  render() {
    const { post, comments } = this.props;
    const orderedComments = orderCommentsByScore(comments);
    return (
      <Comment.Group>
        {
          orderedComments.map(c => (
            <Comment key={c.id}>
              {/* Avatar */}
              <Comment.Avatar src={`https://api.adorable.io/avatars/0/${c.author}.png`} />
              <Comment.Content>
                {/* Author Name */}
                <Comment.Author as="span">{c.author}</Comment.Author>
                {/* Author badge, score count & date */}
                <Comment.Metadata>
                  {c.author === post.author && <Icon name="fire" title="Post author" />}
                  <span>{formatScoreCount(c.voteScore)}</span>
                  <ReactTimeAgo date={new Date(c.timestamp)} />
                </Comment.Metadata>
                {/* Comment text */}
                <Comment.Text>{c.body}</Comment.Text>
                <Comment.Actions>
                  {/* Like */}
                  <Comment.Action onClick={() => this.handleVote(c.id, COMMENT_VOTE.UP)}>
                    <Icon name="thumbs up outline" />
                    <span style={{ userSelect: 'none' }}>Like</span>
                  </Comment.Action>
                  {/* Dislike */}
                  <Comment.Action onClick={() => this.handleVote(c.id, COMMENT_VOTE.DOWN)}>
                    <Icon name="thumbs down outline" />
                    <span style={{ userSelect: 'none' }}>Dislike</span>
                  </Comment.Action>
                  {/* Edit (modal) */}
                  <EditComment
                    comment={c}
                    trigger={(
                      <Comment.Action>
                        <Icon name="redo" />
                        <span style={{ userSelect: 'none' }}>Retract</span>
                      </Comment.Action>
                    )}
                  />
                  {/* Delete */}
                  <Comment.Action onClick={() => this.handleDelete(c.id)}>
                    <Icon name="trash alternate outline" />
                    <span style={{ userSelect: 'none' }}>Delete</span>
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))
        }

        <PostCommentsForm post={post} />
      </Comment.Group>
    );
  }
}

PostComments.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

function mapStateToProps({ comments, posts }, ownProps) {
  const { match: { params: { postId } } } = ownProps;
  return {
    post: posts.find(p => p.id === postId),
    comments,
  };
}

export default withRouter(connect(mapStateToProps)(PostComments));
