import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { BACKEND_URL } from '../helpers/config';
import { REDUCER_TYPES } from './types';

// EXPORT USED CONTEXT

const WishContext = createContext();
export const useWishes = () => {
  return useContext(WishContext);
}

// UTILS 

const utils = require("../helpers/utils");

// PROVIDER 

export const WishProvider = ({ children }) => {


  const { authState } = useAuth();

  const initialState = {
    allWishes: [],
    filteredWishes: [],
    trashWishes: [],
    isFilter: false,
    filter: "all"
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case REDUCER_TYPES.SET_ALL_WISHES:
        return {
          ...state,
          allWishes: action.payload
        }

      case REDUCER_TYPES.SET_TRASH_WISHES:
        return {
          ...state,
          trashWishes: action.payload
        }
      case REDUCER_TYPES.SET_FILTERED_WISHES:
        return {
          ...state,
          filteredWishes: action.payload
        }
      case REDUCER_TYPES.SET_IS_FILTER:
        return {
          ...state,
          isFilter: action.payload
        }
      case REDUCER_TYPES.SET_FILTER:
        return {
          ...state,
          filter: action.payload
        }

      default:
        return state;
    }
  }

  const [wishState, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  // UPDATES

  const setFilteredWishes = useCallback((wishes) => {
    dispatch({ type: REDUCER_TYPES.SET_FILTERED_WISHES, payload: wishes })
  }, []);
  const setFilter = useCallback((value) => {
    dispatch({ type: REDUCER_TYPES.SET_FILTER, payload: value })
  }, []);
  const setIsFilter = useCallback((value) => {
    dispatch({ type: REDUCER_TYPES.SET_IS_FILTER, payload: value })
  }, []);

  useLayoutEffect(() => {
    const getUserWishes = async () => {
      axios.post(`${BACKEND_URL}/wishes/get/all`, { token: authState.token })
        .then(({ data, status }) => {
        
          if (status === 200) {
            const { data: user } = data;
            const { wishes, trash } = user[0];
            dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: wishes });
            dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: trash });
          }
        });
    }

    if (authState.token) {
      getUserWishes();
    }
  }, [authState.token])

  const refreshDB = useCallback(async (wishes, trash) => {
    wishes &&
      axios.patch(`${BACKEND_URL}/users/update_wishes`, { token: authState.token, wishes })
        .then((res) => {
          console.log(res);
        });

    trash &&
      axios.patch(`${BACKEND_URL}/users/update_trash`, { token: authState.token, trash })
        .then((res) => {
          console.log(res);
        })
  }, [authState.token]);

  // SINGULAR FUNCTIONS

  const addWish = useCallback((wish) => {
    if (wish.text.trim()) {
      wish.text = wish.text.trim();
      const updatedWishes = [wish, ...wishState.allWishes];
      dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes });
      refreshDB(updatedWishes);
    };
    utils.launchSuccessNotification("Task was successfully added!");
    navigate("/");
  }, [navigate, refreshDB, wishState.allWishes]);

  const deleteWish = useCallback((id) => {
    const deletedWish = wishState.allWishes.filter(wish => wish.id === id)[0];
    const updatedWishes = wishState.allWishes.filter(wish => wish.id !== id);
    dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes })
    dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: [...wishState.trashWishes, deletedWish] })
    refreshDB(updatedWishes, [...wishState.trashWishes, deletedWish]);
    utils.launchSuccessNotification("Task was successfully removed!");
  }, [refreshDB, wishState.allWishes, wishState.trashWishes]);

  const completeWish = useCallback((id) => {
    const updatedWishes = wishState.allWishes.map(wish => {
      if (wish.id === id) {
        wish.isCompleted = !wish.isCompleted;
      }
      return wish;
    })
    dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes })
    refreshDB(updatedWishes);
  }, [wishState.allWishes, refreshDB]);

  const updateWish = useCallback(async (id) => {
    const oldText = wishState.allWishes.filter(wish => wish.id === id)[0].text;
    const newName = await utils.askNewName(oldText);
    const updatedWishes = wishState.allWishes.map(wish => {
      if (wish.id === id) {
        wish.text = newName;
      }
      return wish;
    })
    dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes })
    refreshDB(updatedWishes);
    utils.launchSuccessNotification("Task name was succesfully updated!");
  }, [wishState.allWishes, refreshDB])

  const recoverWish = useCallback((id) => {
    const wishToRecover = wishState.trashWishes.filter(wish => wish.id === id)[0];
    const updatedWishes = [wishToRecover, ...wishState.allWishes];
    const trashWishesUpdated = wishState.trashWishes.filter(wish => wish.id !== id);

    dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes })
    dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: trashWishesUpdated })
    refreshDB(updatedWishes, trashWishesUpdated);
    utils.launchSuccessNotification("Task was successfully recovered!");

    if (wishState.trashWishes.length === 1) navigate("/");
  }, [navigate, wishState.allWishes, wishState.trashWishes, refreshDB])

  // PLURAL FUNCTIONS

  const deleteCompletedWishes = useCallback(() => {
    const notCompletedWishes = wishState.allWishes.filter(wish => !wish.isCompleted)
    const completedWishes = wishState.allWishes.filter(wish => wish.isCompleted)

    if (completedWishes.length === 0) {
      utils.launchEmptyNotification("There aren't completed tasks to remove!");
      return;
    }

    dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: notCompletedWishes })
    dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: [...wishState.trashWishes, ...completedWishes] })
    refreshDB(notCompletedWishes, [...wishState.trashWishes, ...completedWishes]);
    utils.launchSuccessNotification("Completed tasks were successfully deleted!");
    navigate("/");
  }, [navigate, refreshDB, wishState.allWishes, wishState.trashWishes])



  const recoverAllWishes = useCallback(() => {
    if (wishState.trashWishes.length === 0) {
      utils.launchEmptyNotification("There aren't tasks to recover!");
      return;
    }
    dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: [...wishState.allWishes, ...wishState.trashWishes] })
    dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: [] })
    refreshDB([...wishState.allWishes, ...wishState.trashWishes], []);
    utils.launchSuccessNotification("All tasks were successfully recovered!");
    navigate("/");
  }, [navigate, refreshDB, wishState.allWishes, wishState.trashWishes])



  const deleteAllWishes = useCallback(async () => {
    if (wishState.allWishes.length === 0) {
      utils.launchEmptyNotification("Wish list is empty!");
      return;
    }
    const accepted = await utils.askConfirmDelete();
    if (accepted) {
      utils.launchSuccessNotification("Wish list was successfully emptied!");
      dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: [] })
      dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: wishState.allWishes });
      refreshDB([], wishState.allWishes);
    }
  }, [refreshDB, wishState.allWishes])



  const deleteTrash = useCallback(async () => {
    if (wishState.trashWishes.length === 0) {
      utils.launchEmptyNotification("Trash is empty!");
      return;
    }
    const accepted = await utils.askConfirmDelete();
    if (accepted) {
      dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: [] })
      refreshDB(null, [])
      utils.launchSuccessNotification("Trash was successfully emptied!");
    }
  }, [refreshDB, wishState.trashWishes.length])

  // OTHER

  const getTotalLeftWishes = useCallback(() => {
    return wishState.allWishes.filter(w => !w.isCompleted).length;
  }, [wishState.allWishes])

  // DATA

  const data = useMemo(() => ({
    wishState,
    setFilteredWishes,
    setFilter,
    setIsFilter,

    singularFunctions: {
      addWish,
      deleteWish,
      updateWish,
      completeWish,
      recoverWish
    },
    pluralFunctions: {
      deleteCompletedWishes,
      getTotalLeftWishes,
      deleteAllWishes,
      recoverAllWishes,
      deleteTrash,
    }
  }), [wishState, setFilteredWishes, setFilter, setIsFilter, addWish, deleteWish, updateWish, completeWish, recoverWish, deleteCompletedWishes, getTotalLeftWishes, deleteAllWishes, recoverAllWishes, deleteTrash])

  return (
    <WishContext.Provider value={data}>{children}</WishContext.Provider>
  )
}

