import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { handleSavePreferenceOrderPosts as saveOrderByPref } from '../actions/preferences';

const options = [
  { key: 1, text: 'Biggest Score', value: 'score' },
  { key: 2, text: 'Newest', value: 'newest' },
  { key: 3, text: 'Oldest', value: 'oldest' },
];

class SortDropdown extends Component {
  handleChange = (e, { value }) => {
    const { dispatch } = this.props;
    dispatch(saveOrderByPref(value));
  }

  render() {
    const { orderBy } = this.props;
    return (
      <Dropdown
        item
        simple
        value={orderBy}
        options={options}
        text="Order posts by"
        onChange={this.handleChange}
      />
    );
  }
}

SortDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
};

SortDropdown.defaultProps = {
  orderBy: 'score',
};

function mapStateToProps({ preferences = {} }) {
  const { orderBy } = preferences;
  return {
    orderBy,
  };
}

export default connect(mapStateToProps)(SortDropdown);
