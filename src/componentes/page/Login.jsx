import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BACKEND_URL } from '../../helpers/config';

const Login = () => {

  const [name, setName] = useState('');
  const { login, setError, authState } = useAuth();
  const navigate = useNavigate();

  const handleInput = ({ target }) => {
    setName(target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get(`${BACKEND_URL}/users/save/${name}`)
      .then(({ data, status }) => {

        if (status === 204) {
          setError("Username already exists!");
        } else {
          login(name, data.token);
          navigate('/list');
        }
      }
      );
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
      <p className='text-danger'>{authState.error}</p>
      <input type="submit" className='mb-4 w-100 bg-danger' value="Start" />
    </form>
  );
}

export default Login;