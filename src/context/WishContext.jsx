import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const WishContext = createContext();
export const useWishes = () => {
  return useContext(WishContext);
}

const items = JSON.parse(localStorage.getItem('tasks'));

export const WishProvider = ({ children }) => {

  const [filteredTasks, setFilteredTasks] = useState(items ? items : []);
  const [allTasks, setAllTasks] = useState(items ? items : []);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    setFilteredTasks([...allTasks]);
  }, [allTasks])

  const deleteTask = id => {
    const updateTasks = allTasks.filter(task => task.id !== id);
    setAllTasks(updateTasks);
  };

  const completeTask = (id) => {
    const updateTaks = allTasks.map(task => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    })
    setAllTasks(updateTaks);
  };

  const addTask = (task) => {
    if (task.text.trim()) {
      task.text = task.text.trim();
      const updateTaks = [task, ...allTasks];
      setAllTasks(updateTaks);
    };
  };

  const deleteAllTasks = () => {
    setAllTasks([]);
    navigate("/");
  }

  const deleteCompletedTasks = () => {
    setAllTasks([...allTasks.filter(t => !t.isCompleted)]);
    navigate("/");
  }

  const getTotalLeftTasks = () => {
    return allTasks.filter(t => !t.isCompleted).length;
  }

  const data = {
    variables: {
      allTasks,
      setAllTasks
    },
    filters: {
      filter, 
      setFilter,
      filteredTasks,
      setFilteredTasks,
      isFilter,
      setIsFilter
    },
    functions: {
      addTask,
      deleteTask,
      completeTask,
      getTotalLeftTasks,
      deleteAllTasks,
      deleteCompletedTasks
    }
  }
  return (
    <WishContext.Provider value={data}>{children}</WishContext.Provider>
  )
}

