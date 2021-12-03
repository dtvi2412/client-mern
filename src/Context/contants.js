export const apiUrl =  process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/api' : 'https://safe-plains-96776.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'learning-mearn';

export const POSTS_LOADING_SUCCESS = 'POSTS_LOADING_SUCCESS'
export const POSTS_LOADING_FAIL = 'POST_LOADING_FAIL';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const SET_POST = 'SET_POST';
export const UPDATE_POST = 'UPDATE_POST';