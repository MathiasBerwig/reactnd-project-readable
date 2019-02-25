import React, { PureComponent } from 'react';
import { Card } from 'semantic-ui-react';

export default class Post extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <Card>
        <Card.Content>{ post.title }</Card.Content>
      </Card>
    )
  }
}
