import React, { useEffect } from 'react'
import { TaskList, Form, Login, Cover } from '../index';
import { useTasks } from '../../context/TaskContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Main = () => {

  const { type } = useParams();
  const navigate = useNavigate();

  const { variables, singularFunctions, filters } = useTasks();
  const { allTasks, trashTasks, filteredTasks, setFilteredTasks } = variables;
  const { addTask, completeTask, deleteTask, updateTask, recoverTask } = singularFunctions;
  const { setFilter, isFilter, setIsFilter } = filters;
  const { authState, logout } = useAuth();

  useEffect(() => {

    if (typeof (type) !== "undefined") {

      setIsFilter(true);
      setFilter(type);

      switch (type) {
        case "active":
          setFilteredTasks([...allTasks.filter(t => !t.isCompleted)]);
          break;

        case "completed":
          setFilteredTasks([...allTasks.filter(t => t.isCompleted)])
          break;

        case "trash":
          setFilteredTasks([...trashTasks])
          break;

        default:
          setFilter("all");
          setIsFilter(false);
          navigate("*");
          break;
      }
    } else {
      setIsFilter(false);
      setFilter("all");
    }
  }, [type, allTasks, trashTasks]);

  return (
    <>
      <Cover />
      <div className="wish-list">
        <h1 className='wish-list__title'>TODO LIST</h1>
        <Form onSubmit={addTask} />
        <div className='wish-list__main'>
          <TaskList
            tasks={isFilter ? filteredTasks : allTasks}
            completeTask={completeTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            recoverTask={recoverTask}
          />
        </div>
        <p>{authState.name}</p>
        <p onClick={logout}>LOGOUT</p>
      </div>
    </>
  )
}

export default Main;