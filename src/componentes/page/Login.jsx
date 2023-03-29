import axios from 'axios';
import { useState } from 'react';
import { BACKEND_URL } from '../../helpers/config';

const Login = () => {

  const [name, setName] = useState('');

  const handleInput = ({ target }) => {
    setName(target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`${BACKEND_URL}/users/save/${name}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-25 m-auto">
      <div className="text-center">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          style={{ width: '185px' }} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">You are in my TODO List</h4>
      </div>
      <p>Please enter your username to start!!!</p>
      <input
        className='w-100 mb-2'
        value={name}
        onChange={handleInput}
        type='text'
      />
      <input type="submit" className='mb-4 w-100 bg-danger' value="Start" />
    </form>
  );
}

export default Login;