import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { handleSavePreferenceOrderPosts as saveOrderByPref } from '../actions/preferences';

const options = [
  { key: 1, text: 'Date', value: 'date' },
  { key: 2, text: 'Score', value: 'score' },
];

class SortDropdown extends Component {
  // handleChange = (e, { value }) => {
  //   const { dispatch } = this.props;
  //   dispatch(saveOrderByPref(value));
  // }

  render() {
    const { orderBy } = this.props;
    // onChange={this.onSortChange}
    return (
      
      <Dropdown item simple text="Order posts by" options={options}  value={orderBy} />
    );
  }
}

SortDropdown.propTypes = {
  orderBy: PropTypes.bool.isRequired,
};

function mapStateToProps({ preferences }) {
  //const { orderBy } = preferences;
  return {
    orderBy: 'date',
  };
}

export default connect((mapStateToProps)(SortDropdown));
