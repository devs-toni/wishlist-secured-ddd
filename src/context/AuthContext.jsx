import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useReducer } from 'react'
import { REDUCER_TYPES } from './types';
import { BACKEND_URL } from '../helpers/config';
import axios from 'axios';

const token = JSON.parse(localStorage.getItem('user')) || undefined;

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  useLayoutEffect(() => {
    const verifyToken = async () => {
      if (token) {
        await axios.post(`${BACKEND_URL}/users/verify`, { token })
          .then(({ data, status }) => {
            const { data: user } = data;
            const { name, token } = user;
            if (status === 200) {
              login(name, token);
            }
          }).catch(() => {
            logout();
          });
      }
    }
    if (token) verifyToken();
  }, [])

  /*
  ! REDUCER
  */

  const initialState = {
    isAuthenticated: token ? true : false,
    name: token ? "" : "",
    token: token ? token : "",
    error: "",
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case REDUCER_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          name: action.payload.name,
          token: action.payload.token,
        };

      case REDUCER_TYPES.LOGIN_ERROR:
        return {
          ...state,
          error: action.payload,
        };

      case REDUCER_TYPES.LOGOUT:
        return {
          isAuthenticated: false,
          name: "",
          token: "",
          error: ""
        }

      default:
        return state;
    }
  }

  const [authState, dispatch] = useReducer(reducer, initialState);

  /*
  ? FUNCTIONS DISPATCH
  */
  const login = useCallback((name, token) => {
    localStorage.setItem("user", JSON.stringify(token));
    dispatch({ type: REDUCER_TYPES.LOGIN_SUCCESS, payload: { name, token } })
  }, []);

  const setError = useCallback((msg) => {
    dispatch({ type: REDUCER_TYPES.LOGIN_ERROR, payload: msg })
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    dispatch({ type: REDUCER_TYPES.LOGOUT });
  }, [])

  const data = useMemo(() => ({
    authState,
    login,
    setError,
    logout
  }), [authState, login, setError, logout])

  return (
    <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
  )
}