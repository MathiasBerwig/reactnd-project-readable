/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal } from 'semantic-ui-react';
import { formatCommentCount } from '../../api/helper';

class PostActions extends PureComponent {
  handleViewCommentsToggle = () => {
    const { history, post } = this.props;
    const commentsVisible = history.location.pathname.endsWith('/comments');
    history.push(`/${post.category}/${post.id}/${commentsVisible ? '' : 'comments'}`);
  }

  handleEdit = () => {
    // TODO
  }

  handleDelete = () => {
    // TODO
  }

  render() {
    const { post } = this.props;
    return (
      <span className="post-actions-container">

        {/* View Comments */}
        <Button className="action-button" size="mini" basic onClick={this.handleViewCommentsToggle}>
          <Icon name="comments outline" />
          {formatCommentCount(post.commentCount)}
        </Button>

        {/* Edit */}
        <Button className="action-button" size="mini" basic onClick={this.handleEdit}>
          <Icon name="edit outline" />
          Edit
        </Button>

        {/* Delete */}
        <Modal
          basic
          header="Are you sure?"
          content={`By deleting "${post.title}" you will have no chance to come back. It will be gone forever.`}
          actions={['Changed my mind', {
            key: 'delete',
            content: 'Delete, please',
            positive: true,
            onClick: this.handleDelete,
          }]}
          trigger={(
            <Button className="action-button" size="mini" basic>
              <Icon name="trash alternate outline" />
              Delete
            </Button>
          )}
        />
      </span>
    );
  }
}

PostActions.propTypes = {
  post: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(PostActions);
