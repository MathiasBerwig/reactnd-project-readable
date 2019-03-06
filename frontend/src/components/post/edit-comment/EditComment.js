/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  TextArea,
  Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleUpdateComment } from '../../../actions/comments';

class EditComment extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      comment: props.comment,
      success: false,
    };
  }

  handleFormChange = (e, { name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      comment: { ...prevState.comment, [name]: value },
    }));
  }

  handleFormSubmit = () => {
    const { dispatch } = this.props;
    const { comment } = this.state;
    dispatch(handleUpdateComment(comment));
    this.setState({ success: true });
  }

  render() {
    const { trigger } = this.props;
    const { comment, success } = this.state;
    return (
      <Modal trigger={trigger}>
        <Modal.Header>Wanna say it different?</Modal.Header>
        <Modal.Content>
          <Form success={success}>
            {/* Author name */}
            <Form.Input
              name="author"
              value={comment.author}
              label="Who said it"
              disabled
            />
            {/* Comment */}
            <Form.Input
              name="body"
              value={comment.body}
              label="Your words"
              placeholder="You could have deleted your message..."
              control={TextArea}
              required
              onChange={this.handleFormChange}
            />
            {/* Save/submit */}
            <Form.Button onClick={this.handleFormSubmit} primary>Save</Form.Button>
            {/* Success message */}
            <Message success header="Retificated" content="Hope you said it right this time." />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

EditComment.propTypes = {
  comment: PropTypes.object.isRequired,
  trigger: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(EditComment);
