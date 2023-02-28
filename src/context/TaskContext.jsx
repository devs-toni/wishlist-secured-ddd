import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

// EXPORT USED CONTEXT

const TaskContext = createContext();
export const useTasks = () => {
  return useContext(TaskContext);
}

// UTILS 

const utils = require("../helpers/utils");
const { items, trashItems } = utils.getLocalStorageItems();

// PROVIDER 

export const TaskProvider = ({ children }) => {

  // STATES 

  const [allTasks, setAllTasks] = useState(items ? items : []);
  const [filteredTasks, setFilteredTasks] = useState(items ? items : []);
  const [trashTasks, setTrashTasks] = useState(trashItems ? trashItems : []);

  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  // UPDATES

  useEffect(() => {
    utils.setLocalStorageItems("TASKS", allTasks)
  }, [allTasks])

  useEffect(() => {
    utils.setLocalStorageItems("TRASH-TASKS", trashTasks)
  }, [trashTasks])


  // SINGULAR FUNCTIONS

  const addTask = (task) => {
    if (task.text.trim()) {
      task.text = task.text.trim();
      const updateTasks = [task, ...allTasks];
      setAllTasks(updateTasks);
    };
    utils.launchSuccessNotification("Task was successfully added!");
    navigate("/");
  };



  const deleteTask = (id) => {
    const deletedTask = allTasks.filter(task => task.id === id)[0];
    setTrashTasks([...trashTasks, deletedTask]);
    setAllTasks(allTasks.filter(task => task.id !== id));
    utils.launchSuccessNotification("Task was successfully removed!");
  };



  const completeTask = (id) => {
    const updateTasks = allTasks.map(task => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    })
    setAllTasks(updateTasks);
  };



  const updateTask = async (id) => {
    const oldText = allTasks.filter(task => task.id === id)[0].text;
    const newName = await utils.askNewName(oldText);
    const updateTasks = allTasks.map(task => {
      if (task.id === id) {
        task.text = newName;
      }
      return task;
    })
    setAllTasks(updateTasks);
    utils.launchSuccessNotification("Task name was succesfully updated!");
  }



  const recoverTask = (id) => {
    const taskToRecover = trashTasks.filter(task => task.id === id)[0];
    const updateTasks = [taskToRecover, ...allTasks];
    const trashTasksUpdated = trashTasks.filter(task => task.id !== id);

    setTrashTasks(trashTasksUpdated);
    setAllTasks(updateTasks);

    utils.launchSuccessNotification("Task was successfully recovered!");
    if (trashTasks.length === 1) navigate("/");
  }



  // PLURAL FUNCTIONS

  const deleteCompletedTasks = () => {
    const notCompletedTasks = allTasks.filter(t => !t.isCompleted)
    const completedTasks = allTasks.filter(t => t.isCompleted)

    if (completedTasks.length === 0) {
      utils.launchEmptyNotification("There aren't completed tasks to remove!");
      return;
    }
    setAllTasks(notCompletedTasks);
    setTrashTasks([...trashTasks, ...completedTasks]);
    utils.launchSuccessNotification("Completed tasks were successfully deleted!");
    navigate("/");
  }



  const recoverAllTasks = () => {
    if (trashTasks.length === 0) {
      utils.launchEmptyNotification("There aren't tasks to recover!");
      return;
    }
    setAllTasks([...allTasks, ...trashTasks]);
    setTrashTasks([]);
    utils.launchSuccessNotification("All tasks were successfully recovered!");
    navigate("/");
  }



  const deleteAllTasks = async () => {
    if (allTasks.length === 0) {
      utils.launchEmptyNotification("Task list is empty!");
      return;
    }
    const accepted = await utils.askConfirmDelete();
    if (accepted) {
      utils.launchSuccessNotification("Task list was successfully emptied!");
      setTrashTasks([...trashTasks, ...allTasks]);
      setAllTasks([]);
    }
  }



  const deleteTrash = async () => {
    if (trashTasks.length === 0) {
      utils.launchEmptyNotification("Trash is empty!");
      return;
    }
    const accepted = await utils.askConfirmDelete();
    if (accepted) {
      setTrashTasks([]);
      utils.launchSuccessNotification("Trash was successfully emptied!");
    }
  }

  // OTHER

  const getTotalLeftTasks = () => {
    return allTasks.filter(t => !t.isCompleted).length;
  }

  // DATA

  const data = {
    variables: {
      allTasks,
      trashTasks,
      filteredTasks,
      setFilteredTasks,
    },
    filters: {
      filter,
      setFilter,
      isFilter,
      setIsFilter
    },
    singularFunctions: {
      addTask,
      deleteTask,
      updateTask,
      completeTask,
      recoverTask
    },
    pluralFunctions: {
      deleteCompletedTasks,
      getTotalLeftTasks,
      deleteAllTasks,
      recoverAllTasks,
      deleteTrash,
    }
  }

  return (
    <TaskContext.Provider value={data}>{children}</TaskContext.Provider>
  )
}

