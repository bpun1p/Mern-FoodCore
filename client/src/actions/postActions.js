import {
  FETCH_USER_POSTS,
  POST_TO_USER,
  FETCH_ALL_POSTS,
  POST_TO_ALL,
} from './types';

let currentPort;
const currentUrl = window.location.href;

if (currentUrl.includes('localhost')) {
  currentPort = 'http://localhost:5000';
} else {
  currentPort = '/api';
}

export const fetchUserPosts = () => (dispatch) => {
  fetch(`${currentPort}/user/recipes`,
    {
      withCredentials: true,
      credentials: 'include',
    })
    .then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      return { message: { msgBody: 'UnAuthorized' }, msgError: true };
    })
    .then((posts) => dispatch({
      type: FETCH_USER_POSTS,
      payload: posts,
    }));
};

export const postToUserData = (postData) => (dispatch) => {
  fetch(`${currentPort}/user/recipes`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postData),
      withCredentials: true,
      credentials: 'include',
    })
    .then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      return { message: { msgBody: 'UnAuthorized' }, msgError: true };
    })
    .then(() => dispatch({
      type: POST_TO_USER,
    }));
};

export const fetchAllPosts = () => (dispatch) => {
  fetch(`${currentPort}/all-recipes`)
    .then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      return { message: { msgBody: 'UnAuthorized' }, msgError: true };
    })
    .then((posts) => dispatch({
      type: FETCH_ALL_POSTS,
      payload: posts,
    }));
};

export const postToAllData = (postData) => (dispatch) => {
  fetch(`${currentPort}/all-recipes`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postData),
      withCredentials: true,
      credentials: 'include',
    })
    .then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      return { message: { msgBody: 'UnAuthorized' }, msgError: true };
    })
    .then(() => dispatch({
      type: POST_TO_ALL,
    }));
};
