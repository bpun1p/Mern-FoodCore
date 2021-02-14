import {
  USER_SIGNUP,
  USER_LOGIN,
  USER_LOGOUT,
  USER_AUTHENTICATE
} from './types';

let currentPort;
const currentUrl = window.location.href;

if (currentUrl.includes('localhost')) {
  currentPort = 'http://localhost:5000';
} else {
  currentPort = '/api';
}

export const login = (user) => (dispatch) => {
  fetch(`${currentPort}/user/login`,
    {
      method: 'post',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      credentials: 'include',
    })
    .then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      return { isAuthenticated: false, user: { username: '' }};
    })
    .then((user) => dispatch({
      type: USER_LOGIN,
      payload: user,
    }));
};

export const register = (user) => (dispatch) => {
  fetch(`${currentPort}/user/register`,
    {
      method: 'post',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((user) => dispatch({
      type: USER_SIGNUP,
      payload: user,
    }));
};

export const logout = () => (dispatch) => {
  fetch(`${currentPort}/user/logout`,
    {
      withCredentials: true,
      credentials: 'include',
    })
    .then((res) => res.json())
    .then((user) => dispatch({
      type: USER_LOGOUT,
      payload: user,
    }));
};
  
export const authenticate = () => (dispatch) => {
  fetch(`${currentPort}/user/authenticated`,
    {
      withCredentials: 'true',
      credentials: 'include',
    })
    .then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      return { isAuthenticated: false, user: { username: '' } };
    })
    .then((user) => dispatch({
      type: USER_AUTHENTICATE,
      payload: user,
    }));
};
