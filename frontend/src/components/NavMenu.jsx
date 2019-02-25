/* eslint-disable react/forbid-prop-types */

import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Container,
  Image,
  Menu,
  Dropdown,
  Button,
} from 'semantic-ui-react';

class NavMenu extends PureComponent {
  render() {
    const { categories, location: { pathname } } = this.props;
    return (
      <Menu fixed="top" inverted>
        <Container>
          {/* Readable Logo  */}
          <Menu.Item as={Link} to="/" header>
            <Image
              size="mini"
              src="/logo.png"
              style={{ marginRight: '1.5em' }}
            />
            Readable
          </Menu.Item>
          {/* Categories Dropdown */}
          <Dropdown item simple text="Categories">
            <Dropdown.Menu>
              {
                categories.map(cat => (
                  <Dropdown.Item
                    as={Link}
                    key={cat.path}
                    to={cat.path}
                    active={`/${cat.path}` === pathname}
                  >
                    {cat.name}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* New Post button */}
          <Menu.Menu position="right">
            <Menu.Item>
              <Button as={Link} to="/new-post" primary>
                New Post
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

NavMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

function mapStateToProps({ categories }) {
  return {
    categories: Object.values(categories),
  };
}

export default withRouter(connect(mapStateToProps)(props => <NavMenu {...props} />));
