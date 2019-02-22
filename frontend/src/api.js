const api = 'http://localhost:3001';

let { token } = localStorage;

if (!token) {
  // eslint-disable-next-line no-multi-assign
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

// #region Categories

export const getCategories = () => fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories);

// #endregion

// #region Posts

export const getPost = postId => fetch(`${api}/posts/${postId}`, { headers })
  .then(res => res.json());

export const getPosts = () => fetch(`${api}/posts`, { headers })
  .then(res => res.json());

export const getPostsByCategory = category => fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json());

export const createPost = post => fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(post),
}).then(res => res.json());

export const updatePost = post => fetch(`${api}/posts`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(post),
}).then(res => res.json());

export const deletePost = postId => fetch(`${api}/posts/${postId}`, { method: 'DELETE', headers })
  .then(res => res.json());

export const votePost = (postId, option) => fetch(`${api}/posts/${postId}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ option }),
}).then(res => res.json());

// #endregion

// #region Comments

export const getComments = (postId) => {
  fetch(`${api}/posts/${postId}/comments`, headers)
    .then(res => res.json());
};

export const getComment = (commentId) => {
  fetch(`${api}/comments/${commentId}`, headers)
    .then(res => res.json());
};

export const createComment = comment => fetch(`${api}/comments`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(comment),
}).then(res => res.json());

export const updateComment = comment => fetch(`${api}/comments`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(comment),
}).then(res => res.json());

export const deleteComment = commentId => fetch(`${api}/comments/${commentId}`, { method: 'DELETE', headers })
  .then(res => res.json());

export const voteComment = (commentId, option) => fetch(`${api}/comments/${commentId}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ option }),
}).then(res => res.json());
// #endregion

// #region Initial Data

export function getInitialData(category) {
  return Promise.all([
    getCategories(),
    category === undefined
      ? getPosts()
      : getPostsByCategory(category),
  ]).then(([categories, posts]) => ({
    categories,
    posts,
  }));
}

// #endregion
