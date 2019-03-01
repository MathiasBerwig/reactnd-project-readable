/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Comment,
  Form,
  Button,
  Icon,
  Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import {
  handleReceiveComments,
  handleVoteComment,
  COMMENT_UP_VOTE_VALUE as UpVote,
  COMMENT_DOWN_VOTE_VALUE as DownVote,
  handleCreateComment,
  handleDeleteComment,
} from '../../actions/comments';
import { formatScoreCount, orderCommentsByScore } from '../../api/helper';

class PostComments extends PureComponent {
  state = { comment: '', author: '', submitted: false };

  componentDidMount() {
    const { dispatch, post: { id } } = this.props;
    dispatch(handleReceiveComments(id));
  }

  handleVote = (commentId, option) => {
    const { dispatch } = this.props;
    dispatch(handleVoteComment(commentId, option));
  }

  handleDelete = (commentId) => {
    const { dispatch } = this.props;
    dispatch(handleDeleteComment(commentId));
  }

  handleFormChange = (e, { name, value }) => this.setState({ [name]: value })

  handleFormSubmit = () => {
    const { comment, author } = this.state;
    const { dispatch, post } = this.props;
    dispatch(handleCreateComment(post.id, comment, author));
    this.setState({ comment: '', author: '', submitted: true });
  }

  render() {
    const { post, comments } = this.props;
    const { author, comment, submitted } = this.state;
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
                  <Comment.Action onClick={() => this.handleVote(c.id, UpVote)}>
                    <Icon name="thumbs up outline" />
                    <span style={{ userSelect: 'none' }}>Like</span>
                  </Comment.Action>
                  {/* Dislike */}
                  <Comment.Action onClick={() => this.handleVote(c.id, DownVote)}>
                    <Icon name="thumbs down outline" />
                    <span style={{ userSelect: 'none' }}>Dislike</span>
                  </Comment.Action>
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

        <Form onSubmit={this.handleFormSubmit} success={submitted} reply>
          {/* Comment text area */}
          <Form.TextArea value={comment} required name="comment" onChange={this.handleFormChange} />
          <Form.Group inline>
            {/* Author Name */}
            <Form.Input value={author} required name="author" placeholder="Your name" onChange={this.handleFormChange} />
            {/* Submit button */}
            <Button content="Say it" labelPosition="left" icon="bullhorn" primary />
          </Form.Group>
          {/* Success message */}
          <Message success header="Alright" content="You're the master of comments!" />
        </Form>
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
    post: Object.values(posts).find(p => p.id === postId),
    comments: Object.values(comments),
  };
}

export default withRouter(connect(mapStateToProps)(PostComments));
