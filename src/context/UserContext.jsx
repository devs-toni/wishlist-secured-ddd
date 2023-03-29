import { createContext, useContext, useMemo, useReducer } from 'react'
import { REDUCER_TYPES } from './types';

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {

/*
! REDUCER
*/

  const initialState = {
    isAuthenticated: false,
    name: "",
    error: ""
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case REDUCER_TYPES.LOGIN_SUCCESS:
        return {
          isAuthenticated: true,
          name: action.payload,
          ...state
        };

      case REDUCER_TYPES.LOGIN_ERROR:
        return {
          error: action.payload,
          ...state
        };

      case REDUCER_TYPES.LOGOUT:
        return initialState;

      default:
        return state;
    }
  }

  const [userState, dispatch] = useReducer(reducer, initialState);

  /*
  ? FUNCTIONS DISPATCH
  */




  const data = useMemo(() => (
    userState
  ), [userState])

  return (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  )
}