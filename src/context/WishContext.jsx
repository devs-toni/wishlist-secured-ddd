import React, { createContext, useContext, useEffect, useState } from 'react'

const WishContext = createContext();
export const useWishes = () => {
  return useContext(WishContext);
}

const items = JSON.parse(localStorage.getItem('tasks'));
console.log()

export const WishProvider = ({ children }) => {

  const [tasks, setTasks] = useState(items ? items : []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  const deleteTask = id => {
    const updateTasks = tasks.filter(task => task.id !== id);
    setTasks(updateTasks);
  };

  const completeTask = (id) => {
    const updateTaks = tasks.map(task => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    })
    setTasks(updateTaks);
  };

  const addTask = (task) => {
    if (task.text.trim()) {
      task.text = task.text.trim();
      const updateTaks = [task, ...tasks];
      setTasks(updateTaks);
    };
  };

  const data = {
    variables: { tasks, setTasks },
    functions: { addTask, deleteTask, completeTask }
  }
  return (
    <WishContext.Provider value={data}>{children}</WishContext.Provider>
  )
}

