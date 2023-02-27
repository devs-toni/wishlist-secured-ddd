import React from 'react';
import { NavLink } from 'react-router-dom';
import { useWishes } from '../context/WishContext';
import Task from './Task';

export default function WishList({ tasks, completeTask, deleteTask }) {

  const {  functions, filters } = useWishes();
  const { filter } = filters;
  const { getTotalLeftTasks, deleteAllTasks, deleteCompletedTasks } = functions;

  return (
    <>
      <div className='wish-list__main--container'>
        {
          tasks.map((task) =>
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              isCompleted={task.isCompleted}
              completeTask={completeTask}
              deleteTask={deleteTask}
            />
          )
        }
        <div className='filter'>
          <div className="filter__items">{getTotalLeftTasks()} items left</div>
          <div className="filter__type">
            <NavLink to="/" className={filter === "all" && "show"}>All</NavLink>
            <NavLink to="/filter/active" className={filter === "active" && "show"}>Active</NavLink>
            <NavLink to="/filter/completed" className={filter === "completed" && "show"}>Completed</NavLink>
          </div>
          <div className="filter__clear">
            <p onClick={deleteCompletedTasks}>Clear Completed</p>
            <p onClick={deleteAllTasks}>Clear All</p>
          </div>
        </div>
      </div>
    </>
  );
}