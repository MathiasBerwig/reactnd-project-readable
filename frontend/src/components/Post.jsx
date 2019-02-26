import React, { PureComponent } from 'react';
import { Card } from 'semantic-ui-react';
import { formatDate } from '../api/helper';

export default class Post extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <Card>
        <Card.Content>{`Score: ${post.voteScore} \n Date: ${formatDate(post.timestamp)}`}</Card.Content>
      </Card>
    )
  }
}
