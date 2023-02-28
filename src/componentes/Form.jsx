import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

export default function Form({ onSubmit }) {

  const [inputTask, setInputTask] = useState('');

  const handleChange = ({ target }) => {
    setInputTask(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      text: inputTask,
      isCompleted: false
    }
    if (inputTask.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: "Name can't be empty!",
      })
    } else if (inputTask.length < 4) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: "Name needs at least 4 characters",
      })
    } else {
      setInputTask('');
      onSubmit(newTask);
    }
  };

  return (
    <form className='form'
      onSubmit={handleSubmit}
    >
      <input
        className='form__input'
        type='text'
        placeholder='Enter Task'
        value={inputTask}
        onChange={handleChange}
      />
    </form>
  );
}