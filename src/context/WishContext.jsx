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
    filter: "all",
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

  // OBTAIN DATA WHEN RELOAD PAGE

  useLayoutEffect(() => {
    const getUserWishes = async () => {
      axios.post(`${BACKEND_URL}/wishes/get/all`, { token: authState.token })
        .then(({ data, status }) => {
          if (status === 200) {
            const trash = data.filter((wish) => wish.isDeleted)
            const all = data.filter((wish) => !wish.isDeleted)
            dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: all });
            dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: trash });
          }
        });
    }
    if (authState.token) {
      getUserWishes();
    }
  }, [authState.token])


  // DATABASE OPERATIONS

  const refreshDB = useCallback(async (reqData, action) => {
    switch (action) {
      case REDUCER_TYPES.ADD_WISH:
        const isAdded = await axios.put(`${BACKEND_URL}/wishes/add`, { data: reqData, token: authState.token })
          .then((res) => res.status === 204 ? false : res.data._id)
        return isAdded;

      case REDUCER_TYPES.REMOVE_WISH:
        const isRemoved = await axios.delete(`${BACKEND_URL}/wishes/remove`, { data: { id: reqData } })
          .then((res) => res.status === 204 ? false : true)
        return isRemoved;

      case REDUCER_TYPES.COMPLETE_WISH:
        const isCompleted = await axios.patch(`${BACKEND_URL}/wishes/complete`, { id: reqData })
          .then((res) => res.status === 204 ? false : true)
        return isCompleted;

      case REDUCER_TYPES.EDIT_WISH:
        const isEdited = await axios.post(`${BACKEND_URL}/wishes/edit`, { id: reqData.id, name: reqData.name })
          .then((res) => res.status === 204 ? false : true)
        return isEdited;

      case REDUCER_TYPES.RECOVER_WISH:
        const isRecovered = await axios.patch(`${BACKEND_URL}/wishes/recover`, { id: reqData })
          .then((res) => res.status === 204 ? false : true)
        return isRecovered;

      case REDUCER_TYPES.DELETE_COMPLETED:
        const areDeleted = await axios.delete(`${BACKEND_URL}/wishes/deleteCompleted`, { data: { token: reqData } })
          .then((res) => res.status === 204 ? false : true)
        return areDeleted;

      case REDUCER_TYPES.RECOVER_ALL:
        const areRecovered = await axios.patch(`${BACKEND_URL}/wishes/recoverAll`, { token: reqData })
          .then((res) => res.status === 204 ? false : true)
        return areRecovered;

      case REDUCER_TYPES.DELETE_ALL:
        const areAllDeleted = await axios.patch(`${BACKEND_URL}/wishes/deleteAll`, { token: reqData })
          .then((res) => res.status === 204 ? false : true)
        return areAllDeleted;

      case REDUCER_TYPES.EMPTY:
        const isEmptied = await axios.delete(`${BACKEND_URL}/wishes/empty`, { data: { token: reqData } })
          .then((res) => res.status === 204 ? false : true)
        return isEmptied;

      default:
        break;
    }
  }, [authState.token]);

  // SINGULAR FUNCTIONS

  const addWish = useCallback(async (wish) => {
    if (wish.text.trim()) {
      const isAdded = await refreshDB(wish, REDUCER_TYPES.ADD_WISH);
      if (isAdded) {
        wish.text = wish.text.trim();
        wish._id = isAdded;
        const updatedWishes = [wish, ...wishState.allWishes];
        dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes })
        utils.launchSuccessNotification("Wish added successfully!")
        if (wishState.isFilter) navigate("/");
      } else {
        utils.launchEmptyNotification("Wish already exists!")
      }
    };
  }, [navigate, refreshDB, wishState.allWishes, wishState.isFilter]);

  const deleteWish = useCallback(async (id) => {
    const isRemoved = await refreshDB(id, REDUCER_TYPES.REMOVE_WISH);
    if (isRemoved) {
      const deletedWish = wishState.allWishes.filter(wish => wish._id === id)[0];
      const updatedWishes = wishState.allWishes.filter(wish => wish._id !== id);
      dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes })
      dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: [...wishState.trashWishes, deletedWish] })
      refreshDB(updatedWishes, [...wishState.trashWishes, deletedWish]);
      utils.launchSuccessNotification("Wish was successfully removed!");
    } else {
      utils.launchEmptyNotification("Can't remove the wish!")
    }
  }, [refreshDB, wishState.allWishes, wishState.trashWishes]);

  const completeWish = useCallback(async (id) => {
    const isCompleted = await refreshDB(id, REDUCER_TYPES.COMPLETE_WISH);
    if (isCompleted) {
      const updatedWishes = wishState.allWishes.map(wish => {
        if (wish._id === id) {
          wish.isCompleted = !wish.isCompleted;
        }
        return wish;
      })
      dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes })
    } else {
      utils.launchEmptyNotification("Can't complete the wish!");
    }
  }, [wishState.allWishes, refreshDB]);

  const updateWish = useCallback(async (id) => {
    const oldText = wishState.allWishes.filter(wish => wish._id === id)[0].text;
    const newName = await utils.askNewName(oldText);
    const isEdited = await refreshDB({ id, name: newName }, REDUCER_TYPES.EDIT_WISH);
    if (isEdited) {
      const updatedWishes = wishState.allWishes.map(wish => {
        if (wish._id === id) {
          wish.text = newName;
        }
        return wish;
      })
      dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes })
      utils.launchSuccessNotification("Task name was succesfully updated!");
    } else {
      utils.launchEmptyNotification("Can't update wish!");
    }
  }, [wishState.allWishes, refreshDB])

  const recoverWish = useCallback(async (id) => {
    const isRecovered = await refreshDB(id, REDUCER_TYPES.RECOVER_WISH);
    if (isRecovered) {
      const wishToRecover = wishState.trashWishes.filter(wish => wish._id === id)[0];
      const updatedWishes = [wishToRecover, ...wishState.allWishes];
      const trashWishesUpdated = wishState.trashWishes.filter(wish => wish._id !== id);
      dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: updatedWishes })
      dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: trashWishesUpdated })
      utils.launchSuccessNotification("Wish was successfully recovered!");
    } else {
      utils.launchEmptyNotification("Can't recover wish!");
    }
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
    const areDeleted = refreshDB(authState.token, REDUCER_TYPES.DELETE_COMPLETED);
    if (areDeleted) {
      dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: notCompletedWishes })
      dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: [...wishState.trashWishes, ...completedWishes] })
      utils.launchSuccessNotification("Completed tasks were successfully deleted!");
      if (wishState.isFilter) navigate("/");
    } else {
      utils.launchEmptyNotification("Can't delete wishes!");
    }
  }, [authState.token, navigate, refreshDB, wishState.allWishes, wishState.isFilter, wishState.trashWishes])



  const recoverAllWishes = useCallback(async () => {
    if (wishState.trashWishes.length === 0) {
      utils.launchEmptyNotification("There aren't tasks to recover!");
      return;
    }
    const areRecovered = await refreshDB(authState.token, REDUCER_TYPES.RECOVER_ALL);
    if (areRecovered) {
      dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: [...wishState.allWishes, ...wishState.trashWishes] })
      dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: [] })
      refreshDB([...wishState.allWishes, ...wishState.trashWishes], []);
      utils.launchSuccessNotification("All tasks were successfully recovered!");
      navigate("/");
    } else {
      utils.launchEmptyNotification("Can't recover wishes!");
    }
  }, [authState.token, navigate, refreshDB, wishState.allWishes, wishState.trashWishes])



  const deleteAllWishes = useCallback(async () => {
    if (wishState.allWishes.length === 0) {
      utils.launchEmptyNotification("Wish list is empty!");
      return;
    }
    const accepted = await utils.askConfirmDelete();
    if (accepted) {
      const areDeleted = await refreshDB(authState.token, REDUCER_TYPES.DELETE_ALL);
      if (areDeleted) {
        dispatch({ type: REDUCER_TYPES.SET_ALL_WISHES, payload: [] })
        dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: [...wishState.trashWishes, ...wishState.allWishes] });
        utils.launchSuccessNotification("Wish list was successfully emptied!");
      } else {
        utils.launchEmptyNotification("Can't delete wishes!");
      }
    }
  }, [authState.token, refreshDB, wishState.allWishes, wishState.trashWishes])



  const deleteTrash = useCallback(async () => {
    if (wishState.trashWishes.length === 0) {
      utils.launchEmptyNotification("Trash is empty!");
      return;
    }
    const accepted = await utils.askConfirmDelete();
    if (accepted) {
      const isEmptied = refreshDB(authState.token, REDUCER_TYPES.EMPTY);
      if (isEmptied) {
        dispatch({ type: REDUCER_TYPES.SET_TRASH_WISHES, payload: [] })
        utils.launchSuccessNotification("Trash was successfully emptied!");
      } else {
        utils.launchSuccessNotification("Can't empty trash!");
      }
    }
  }, [authState.token, refreshDB, wishState.trashWishes.length])

  // OTHER

  const getTotalLeftWishes = useCallback(() => {
    if (wishState.allWishes)
      return wishState.allWishes.filter(w => w?.isCompleted && !w.isCompleted).length;
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

