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
import SortPostsDropdown from './SortPostsDropdown';
import EditPost from '../edit-post/EditPost';

class NavMenu extends PureComponent {
  render() {
    const { categories, location: { pathname } } = this.props;
    return (
      <Menu fixed="top" inverted borderless>
        <Container>
          {/* Readable Logo  */}
          <Menu.Item as={Link} to="/" header>
            <Image
              size="mini"
              src="/img/logo.png"
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
                    key={cat.path}
                    as={Link}
                    to={`/${cat.path}`}
                    active={pathname.includes(cat.path)}
                  >
                    {cat.name}
                  </Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
          {/* Order posts dropdown */}
          {
            (pathname === '/' || !pathname.includes('/posts/')) && <SortPostsDropdown />
          }
          <Menu.Menu position="right">
            {/* New Post button */}
            <Menu.Item>
              <EditPost trigger={(<Button primary>New Post</Button>)} />
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
