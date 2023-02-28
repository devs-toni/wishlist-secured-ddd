import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const WishContext = createContext();
export const useWishes = () => {
  return useContext(WishContext);
}

const items = JSON.parse(localStorage.getItem('tasks'));
const trashItems = JSON.parse(localStorage.getItem('trash-tasks'));

export const WishProvider = ({ children }) => {

  const [filteredTasks, setFilteredTasks] = useState(items ? items : []);
  const [trashTasks, setTrashTasks] = useState(trashItems ? trashItems : []);
  const [allTasks, setAllTasks] = useState(items ? items : []);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isUpdate, setIsUpdate] = useState({ is: false, id: null });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks])

  useEffect(() => {
    localStorage.setItem("trash-tasks", JSON.stringify(trashTasks));
  }, [trashTasks])

  const deleteTask = (id) => {
    const deletedTask = allTasks.filter(t => t.id === id)[0];
    !deletedTask.isCompleted && setTrashTasks([...trashTasks, deletedTask]);
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
      const updateTasks = [task, ...allTasks];
      setAllTasks(updateTasks);
    };

    navigate("/");
  };

  const updateTask = async (id) => {
    const tasks = [...allTasks];
    const indexTask = tasks.findIndex(t => t.id === id);
    const taskToUpdate = allTasks.filter(t => t.id === id)[0];

    const handleSubmit = async (name) => {
      if (!name) {
        await Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: "Name can't be empty!",
        })
      } else if (name.length < 2) {
        await Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: "Name needs at least 4 characters",
        });
      } else {
        return true;
      }
      return false;
    }
    let name = '';
    let validation = false;

    while (!validation) {
      const { value: newName } = await Swal.fire({
        title: 'Update Task',
        input: 'text',
        inputLabel: "Enter the new name",
        inputValue: taskToUpdate.text,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
      name = newName
      validation = await handleSubmit(name);
    }

    taskToUpdate.text = name;
    tasks[indexTask] = taskToUpdate;
    setAllTasks([...tasks]);
    Toast.fire({
      icon: 'success',
      title: 'Name modified successfully'
    })
  }

  const recoverTask = (id) => {
    const taskToRecover = trashTasks.filter(t => t.id === id)[0];
    const updateTasks = [taskToRecover, ...allTasks];
    const trashTasksUpdated = trashTasks.filter(t => t.id !== id);
    setTrashTasks([...trashTasksUpdated]);
    setAllTasks(updateTasks);
    if (trashTasks.length === 1) navigate("/");
  }

  const deleteAllTasks = () => {
    if (allTasks.length === 0) {
      Swal.fire(
        'Information',
        'The trash is empty . . .',
        'info'
      );
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire({
          icon: 'success',
          title: 'All tasks deleted succesfully'
        })
        const deletedTasks = allTasks.filter(t => !t.isCompleted);
        setTrashTasks([...trashTasks, ...deletedTasks]);
        setAllTasks([]);
      }
    })
  }

  const deleteTrash = () => {
    if (trashTasks.length === 0) {
      Swal.fire(
        'Information',
        'The trash is empty . . .',
        'info'
      );
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setTrashTasks([]);
        Toast.fire({
          icon: 'success',
          title: 'Trash emptied succesfully'
        })
      }
    })
  }

  const recoverAllTasks = () => {
    if (trashTasks.length === 0) {
      Swal.fire(
        'Information',
        'The trash is empty . . .',
        'info'
      );
      return;
    }

    Toast.fire({
      icon: 'success',
      title: 'All tasks recovered succesfully'
    })

    setAllTasks([...allTasks, ...trashTasks]);
    setTrashTasks([]);
    navigate("/");
  }

  const deleteCompletedTasks = () => {
    const notCompletedTasks = allTasks.filter(t => !t.isCompleted)
    const completedTasks = allTasks.filter(t => t.isCompleted)
    if (completedTasks.length === 0) {
      Swal.fire(
        'Information',
        "There aren't completed tasks to remove . . .",
        'info'
      );
      return;
    }

    setAllTasks([...notCompletedTasks]);
    navigate("/");
  }

  const getTotalLeftTasks = () => {
    return allTasks.filter(t => !t.isCompleted).length;
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const data = {
    variables: {
      allTasks,
      setAllTasks,
      trashTasks,
      setTrashTasks,
      isUpdate,
      setIsUpdate
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
      updateTask,
      completeTask,
      recoverTask,
      getTotalLeftTasks,
      deleteAllTasks,
      deleteCompletedTasks,
      deleteTrash,
      recoverAllTasks
    }
  }
  return (
    <WishContext.Provider value={data}>{children}</WishContext.Provider>
  )
}

