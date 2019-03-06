/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Message,
} from 'semantic-ui-react';

import { handleCreateComment } from '../../actions/comments';

class PostCommentsForm extends PureComponent {
  state = {
    comment: '',
    author: '',
    submitted: false,
  };

  handleFormChange = (e, { name, value }) => this.setState({ [name]: value })

  handleFormSubmit = () => {
    const { comment, author } = this.state;
    const { dispatch, post } = this.props;
    dispatch(handleCreateComment(post.id, comment.trim(), author.trim()));
    this.setState({ comment: '', author: '', submitted: true });
  }

  render() {
    const { author, comment, submitted } = this.state;
    return (
      <Form onSubmit={this.handleFormSubmit} success={submitted} reply>
        {/* Comment text area */}
        <Form.TextArea
          required
          name="comment"
          value={comment}
          onChange={this.handleFormChange}
        />
        <Form.Group inline>
          {/* Author Name */}
          <Form.Input
            value={author}
            required
            name="author"
            placeholder="Your name"
            onChange={this.handleFormChange}
          />
          {/* Submit button */}
          <Button
            content="Say it"
            labelPosition="left"
            icon="bullhorn"
            primary
            disabled={comment.trim() === '' || author.trim() === ''}
          />
        </Form.Group>
        {/* Success message */}
        <Message success header="All right!" content="You're the master of comments." />
      </Form>
    );
  }
}

PostCommentsForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default connect()(PostCommentsForm);
