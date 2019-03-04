/* eslint-disable import/prefer-default-export */

export function randomId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export function orderAndFilterPosts(posts, category, orderBy) {
  const filteredPosts = category
    ? posts.slice().filter(p => p.category === category)
    : posts.slice();

  switch (orderBy) {
    case 'score': // Biggest score first
      return filteredPosts.sort((a, b) => (b.voteScore - a.voteScore));
    case 'newest': // Most recent posts first
      return filteredPosts.sort((a, b) => (b.timestamp - a.timestamp));
    case 'oldest': // Oldest score first
      return filteredPosts.sort((a, b) => (a.timestamp - b.timestamp));
    default:
      return filteredPosts;
  }
}

export function orderCommentsByScore(comments) {
  return comments.slice().sort((a, b) => b.voteScore - a.voteScore);
}

export function formatCommentCount(commentCount) {
  if (commentCount === 0) {
    return 'no comments';
  }
  return `${commentCount} comment${commentCount === 1 ? '' : 's'}`;
}

export function formatScoreCount(scoreCount) {
  if (scoreCount === 0) {
    return 'zero points';
  }

  return `${scoreCount} point${scoreCount === 1 ? '' : 's'}`;
}
