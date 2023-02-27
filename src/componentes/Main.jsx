import React from 'react'
import WishList from './WishList';
import Form from './Form';
import { useWishes } from '../context/WishContext';

const Main = () => {

  const { variables, functions } = useWishes();
  const { addTask, completeTask, deleteTask } = functions;
  const { tasks, setTasks } = variables;

  return (
    <div className="wish-list">
      <h1 className='wish-list__title'>WISHLIST</h1>
      <Form onSubmit={addTask} />
      <div className='wish-list__main'>
        <WishList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
      </div>
    </div>
  )
}

export default Main