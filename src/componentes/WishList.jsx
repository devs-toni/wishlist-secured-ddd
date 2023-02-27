import React from 'react';
import Task from './Task';

export default function WishList({ tasks, completeTask, deleteTask }) {

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
      </div>
    </>
  );
}