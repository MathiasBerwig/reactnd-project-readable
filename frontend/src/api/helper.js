/* eslint-disable import/prefer-default-export */

export function orderPosts(posts, orderBy) {
  switch (orderBy) {
    case 'score': // Biggest score first
      return posts.slice().sort((a, b) => (b.voteScore - a.voteScore));
    case 'newest': // Most recent posts first
      return posts.slice().sort((a, b) => (b.timestamp - a.timestamp));
    case 'oldest': // Oldest score first
      return posts.slice().sort((a, b) => (a.timestamp - b.timestamp));
    default:
      return posts;
  }
}

export function formatCommentCount(commentCount) {
  if (commentCount === 0) {
    return 'no comments';
  }
  return `${commentCount} comment${commentCount === 1 ? '' : 's'}`;
}
