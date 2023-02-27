import React, { useState } from 'react';
import Form from './Form';
import Task from './Task';

export default function TaskList() {

  const [tasks, setTasks] = useState([]);

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

  return (
    <>
      <Form onSubmit={addTask} />
      <div className='wish-list__main--container'>
        {
          tasks.map((task) =>
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              isCompleted={task.completada}
              completeTask={completeTask}
            />
          )
        }
      </div>
    </>
  );
}