import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../helpers/config';
import SearchBox from '../SearchBox';

export default function Form({ onSubmit }) {
  const { validateName } = require("../../helpers/utils");
  const [inputTask, setInputTask] = useState('');
  const [searchData, setSearchData] = useState([])

  const handleChange = ({ target }) => {
    setInputTask(target.value);
    if (target.value.length > 1) {
      axios.get(`${BACKEND_URL}/wishes/search/${target.value}`)
        .then(({ data, status }) => {
          console.log(data.data);
          if (status === 200) setSearchData(data.data);
        })
    } else {
      setSearchData([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validName = await validateName(inputTask);
    if (validName) {
      setInputTask('');
      onSubmit({
        createdAt: new Date(),
        text: inputTask,
        isCompleted: false,
        isDeleted: false,
      });
      setSearchData([]);
    }
  }

  const handleClick = async ({ target }) => {
    setSearchData([]);
    setInputTask('');
    onSubmit({
      createdAt: new Date(),
      text: target.textContent,
      isCompleted: false,
      isDeleted: false,
    });
  }

  return (
    <form className='form search__container' onSubmit={handleSubmit}>
      <input
        className='form__input'
        type='text'
        placeholder='Enter Task'
        value={inputTask}
        onChange={handleChange}
      />
      <SearchBox results={searchData} click={handleClick} />
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}