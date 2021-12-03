import { createContext, useReducer, useState, useEffect } from 'react';
import { AuthReducer } from '../reducers/AuthReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './contants';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const [menuMobile, setMenuMobile] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  //Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (err) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  //Login
  const login = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      await loadUser();

      return response.data;
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };
  //Logou
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);

    dispatch({
      type: 'SET_AUTH',
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };
  //Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      await loadUser();

      return response.data;
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  const authContextData = {
    login,
    logoutUser,
    registerUser,
    authState,
    menuMobile,
    setMenuMobile,
  };
  //return
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;