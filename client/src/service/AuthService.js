const currentUrl = window.location.href;
let currentPort;
if (currentUrl.includes('localhost')) {
  currentPort = 'http://localhost:5000';
} else {
  currentPort = '/api';
}
export default {
  login: (user) => fetch(`${currentPort}/user/login`,
    {
      method: 'post',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      credentials: 'include',
    })
    .then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      return { isAuthenticated: false, user: { username: '' } };
    }),

  register: (user) => fetch(`${currentPort}/user/register`,
    {
      method: 'post',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((data) => data),

  logout: () => fetch(`${currentPort}/user/logout`,
    {
      withCredentials: true,
      credentials: 'include',
    })
    .then((res) => res.json())
    .then((data) => data),

  isAuthenticated: () => fetch(`${currentPort}/user/authenticated`,
    {
      withCredentials: 'true',
      credentials: 'include',
    })
    .then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      return { isAuthenticated: false, user: { username: '' } };
    }),
};
