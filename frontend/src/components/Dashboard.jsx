import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    const { posts, categories } = this.props;

    return (
      <div>
        Dashboard
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    posts,
    categories
  }
}

export default connect(mapStateToProps)(Dashboard);