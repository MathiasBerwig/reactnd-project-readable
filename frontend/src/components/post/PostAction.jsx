import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

function PostAction(props) {
  const { linkPath, iconName, text } = props;
  return (
    <span className="action">
      <Link to={linkPath}>
        <Icon name={iconName} />
        {text}
      </Link>
    </span>
  );
}

PostAction.propTypes = {
  linkPath: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default PostAction;
