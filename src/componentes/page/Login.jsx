import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BACKEND_URL } from '../../helpers/config';

const Login = () => {

  const [form, setForm] = useState({ name: "", password: "" });
  const { login, setError, authState } = useAuth();
  const navigate = useNavigate();

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BACKEND_URL}/users/login`, { form })
      .then(({ data, status }) => {
        const { data: user } = data;
        const { name, token } = user;
        if (status === 204) {
          setError("Username/Password are not valid!");
        } else {
          login(name, token);
          navigate('/list');
        }
      });
  }

  useEffect(() => {
    if (authState.isAuthenticated) navigate('/list');
  }, [authState.isAuthenticated])


  return (
    <form onSubmit={handleSubmit} className="w-25 m-auto">
      <div className="text-center">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          style={{ width: '185px' }} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">You are in my TODO List</h4>
      </div>
      <p>Login</p>
      <input
        className='w-100 mb-2'
        value={form.name}
        onChange={handleInput}
        name="name"
        type='text'
      />
      <input
        className='w-100 mb-2'
        value={form.password}
        name="password"
        onChange={handleInput}
        type='password'
      />
      <p className='text-danger'>{authState.error}</p>
      <input type="submit" className='mb-4 w-100 bg-danger' value="Start" />
      <NavLink to='/register'>Register</NavLink>
    </form>
  );
}

export default Login;