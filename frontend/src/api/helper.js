export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return `${d.toLocaleDateString()} - ${time.substr(0, 5) + time.slice(-2)}`;
}

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
