import { useState, createContext, useReducer, useCallback } from 'react';
import { PostsReducer } from '../reducers/PostsReducer';
import axios from 'axios';
import {
  apiUrl,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_FAIL,
  ADD_POST,
  DELETE_POST,
  SET_POST,
  UPDATE_POST,
} from './contants';

export const PostsContext = createContext();

const PostsContextProvider = ({ children }) => {
  //Initial Posts State
  const [postState, dispatch] = useReducer(PostsReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  //Modal Add Post State
  const [modalAdd, setModalAdd] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);

  const [toastMessage, setToastMessage] = useState({
    display: false,
    message: '',
    style: {},
  });

  //Loading Post with User access
  const loadPosts = useCallback(() => {
    axios
      .get(`${apiUrl}/post`)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: POSTS_LOADING_SUCCESS,
            payload: {
              data: response.data.posts,
              postsLoading: false,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({ type: POSTS_LOADING_FAIL });
      });
  }, []);

  //Api Add Post
  const addPost = async (dataPost) => {
    try {
      const response = await axios.post(`${apiUrl}/post`, dataPost);
      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : { success: false, message: 'Server Error' };
    }
  };

  //Api Update Post
  const updatePost = async (id, dataPost) => {
    try {
      const response = await axios.put(`${apiUrl}/post/${id}`, dataPost);
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : { success: false, message: 'Server Error' };
    }
  };

  //Api Delete Post
  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/post/${id}`);
      dispatch({
        type: DELETE_POST,
        payload: {
          id,
        },
      });

      return response.data;
    } catch (err) {
      return err.response.data
        ? err.response.data
        : { success: false, message: 'Server Error' };
    }
  };

  //Get the value of Post to assign to the Post
  const getValuePostWithId = (id) => {
    dispatch({
      type: SET_POST,
      payload: id,
    });
  };

  //Post context data
  const postsContextData = {
    loadPosts,
    postState,
    modalAdd,
    setModalAdd,
    updateModal,
    setUpdateModal,
    addPost,
    toastMessage,
    setToastMessage,
    deletePost,
    updatePost,
    getValuePostWithId,
  };
  //return
  return (
    <PostsContext.Provider value={postsContextData}>
      {children}
    </PostsContext.Provider>
  );
};
export default PostsContextProvider;
