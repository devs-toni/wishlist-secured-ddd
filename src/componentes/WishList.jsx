import React from 'react';
import { NavLink } from 'react-router-dom';
import { useWishes } from '../context/WishContext';
import Wish from './Wish';

export default function WishList({ tasks, completeTask, deleteTask, updateTask, recoverTask }) {

  const { functions, filters } = useWishes();
  const { filter } = filters;
  const { getTotalLeftTasks, deleteAllTasks, deleteCompletedTasks, deleteTrash, recoverAllTasks } = functions;
  const inTrash = (filter == "trash") ? true : false;
  const inCompleted = (filter == "completed") ? true : false;

  return (
    <>
      <div className='filter'>
        <div className="filter__items">{getTotalLeftTasks()} items left</div>
        <div className="filter__type">
          <NavLink to="/" className={filter === "all" && "show"}>All</NavLink>
          <NavLink to="/filter/active" className={filter === "active" && "show"}>Active</NavLink>
          <NavLink to="/filter/completed" className={filter === "completed" && "show"}>Completed</NavLink>
          <NavLink to="/filter/trash" className={filter === "trash" && "show"}>Trash</NavLink>
        </div>
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
      <div className='wish-list__main--container'>
        {
          tasks.map((task) =>
            <Wish
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
      </div>
    </>
  );
}