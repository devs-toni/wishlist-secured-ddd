import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export default function Form({ onSubmit }) {
  const { validateName } = require("../../helpers/utils");
  const [inputTask, setInputTask] = useState('');

  const handleChange = ({ target }) => {
    setInputTask(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validName = await validateName(inputTask);
    if (validName) {
      setInputTask('');
      onSubmit({
        id: uuidv4(),
        creation: new Date().toISOString(),
        text: inputTask,
        isCompleted: false
      });
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
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

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}