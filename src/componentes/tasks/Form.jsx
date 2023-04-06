import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BACKEND_URL } from '../../helpers/config';
import SearchBox from '../SearchBox';
import { useAuth } from '../../context/AuthContext';

export default function Form({ onSubmit }) {
  const { validateName } = require("../../helpers/utils");
  const [inputTask, setInputTask] = useState('');
  const [searchData, setSearchData] = useState([]);
  const { authState } = useAuth();

  const handleChange = ({ target }) => {
    setInputTask(target.value);
    if (target.value.length > 1) {
      axios.get(`${BACKEND_URL}/wishes/search/${target.value}/${authState.token}`)
        .then(({ data, status }) => {
          if (status === 200) setSearchData(data.data);
        })
    } else {
      setSearchData([]);
    }
  };

  useEffect(() => {
    const escapeQuit = (key) => {
      if (key === "Escape") setSearchData([]);
    }
    const bodyClickQuit = () => {
      setSearchData([]);
    }
    
    document.body.addEventListener("click", () => {
      bodyClickQuit();
    });
    document.body.addEventListener("keydown", ({ key }) => {
      escapeQuit(key);
    });

    return () => {
      document.body.removeEventListener("click", () => {
        bodyClickQuit();
      });
      document.body.removeEventListener("keydown", ({ key }) => {
        escapeQuit(key);
      });
    }
  }, [searchData.length])



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
    <div className='search'>
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
    </div>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}