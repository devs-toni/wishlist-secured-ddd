import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import Task from './Task';
import PropTypes from 'prop-types';

export default function TaskList({ tasks, completeTask, deleteTask, updateTask, recoverTask }) {

  const { pluralFunctions, filters, variables } = useTasks();
  const { trashTasks } = variables;
  const { getTotalLeftTasks, deleteAllTasks, deleteCompletedTasks, deleteTrash, recoverAllTasks } = pluralFunctions;
  const { filter } = filters;

  const inTrash = (filter === "trash") ? true : false;
  const leftItems = getTotalLeftTasks();

  const isActive = (state) => (filter === state) ? "show" : "";
  const hasItems = (trashTasks.length > 0) ? "not-empty" : "";

  return (
    <>
      <div className='filter'>
        <div className="filter__items">{leftItems} items left</div>
        <nav className="filter__type">
          <NavLink to="/" className={isActive("all")}>All</NavLink>
          <NavLink to="/filter/active" className={isActive("active")}>Active</NavLink>
          <NavLink to="/filter/completed" className={isActive("completed")}>Completed</NavLink>
          <NavLink to="/filter/trash" className={`${isActive("trash")} ${hasItems}`}>Trash</NavLink>
        </nav>
        <div className="filter__clear">
          {
            !inTrash ?
              (
                <>
                  <p onClick={deleteCompletedTasks}>Clear Completed</p>
                  <p onClick={deleteAllTasks}>Clear All</p>
                </>
              )
              :
              (
                <>
                  <p onClick={recoverAllTasks}>Recover All</p>
                  <p onClick={deleteTrash}>Clear Trash</p>
                </>
              )
          }
        </div>
      </div>
      <article className='wish-list__main--container'>
        {
          tasks.map((task) =>
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              isCompleted={task.isCompleted}
              completeTask={completeTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              recoverTask={recoverTask}
            />
          )
        }
      </article>
    </>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  completeTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  recoverTask: PropTypes.func.isRequired
}