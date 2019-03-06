/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Modal,
  Form,
  TextArea,
  Select,
  Message,
} from 'semantic-ui-react';
import { handleCreatePost, handleUpdatePost } from '../../actions/posts';

class EditPost extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      post: props.post,
      success: false,
    };
  }

  handleFormChange = (e, { name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      post: { ...prevState.post, [name]: value },
    }));
  }

  handleFormClear = () => {
    this.setState({
      success: false,
    });
  }

  handleFormSubmit = () => {
    const { dispatch } = this.props;
    const { post } = this.state;
    dispatch(!post.id ? handleCreatePost(post) : handleUpdatePost(post));
    this.handleFormClear();
    this.setState({ success: true });
  }

  render() {
    const { trigger, categoryOptions } = this.props;
    const { post, success } = this.state;
    return (
      <Modal trigger={trigger}>
        <Modal.Header>{post.id ? 'Edit post' : 'Write a new post'}</Modal.Header>
        <Modal.Content>
          <Form success={success}>
            <Form.Group>
              {/* Title */}
              <Form.Input
                name="title"
                value={post.title}
                label="Title"
                placeholder="Be clear about what you are telling"
                width={10}
                required
                onChange={this.handleFormChange}
              />
              <Form.Input
                name="author"
                value={post.author}
                label="Author"
                placeholder="Your @"
                width={5}
                required
                onChange={this.handleFormChange}
              />
              {/* Category */}
              <Form.Input
                name="category"
                value={post.category}
                label="Category"
                control={Select}
                options={categoryOptions}
                width={5}
                required
                onChange={this.handleFormChange}
              />
            </Form.Group>
            {/* Post body */}
            <Form.Input
              name="body"
              value={post.body}
              label="Text"
              placeholder="Your message to the world"
              control={TextArea}
              required
              onChange={this.handleFormChange}
            />
            <Message success header={post.id ? 'Post updated!' : 'Post created!'} content="Congrats my friend." />
            <Form.Group inline>
              <Form.Button onClick={this.handleFormClear}>Clear</Form.Button>
              <Form.Button onClick={this.handleFormSubmit} primary>Submit</Form.Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

EditPost.propTypes = {
  post: PropTypes.object,
  categoryOptions: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  trigger: PropTypes.object.isRequired,
};

EditPost.defaultProps = {
  post: {
    author: '',
    body: '',
    category: '',
    title: '',
  },
};

function mapCategoriesToSelectChoices(categories) {
  const options = [];
  categories.map(c => options.push({
    key: c.path,
    value: c.path,
    text: c.name,
  }));
  return options;
}

function mapStateToProps({ categories }) {
  return {
    categoryOptions: mapCategoriesToSelectChoices(Object.values(categories)),
  };
}

export default withRouter(connect(mapStateToProps)(EditPost));
