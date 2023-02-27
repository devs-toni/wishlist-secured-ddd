import React, { useState } from 'react';
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
      texto: inputTask,
      completada: false
    }
    setInputTask('');
    onSubmit(newTask);
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
      <button type='submit' className='form__submit'>Add</button>
    </form>
  );
}