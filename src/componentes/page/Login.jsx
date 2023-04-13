import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BACKEND_URL } from '../../helpers/config';
import loginImage from '../../assets/images/login.webp';

const Login = () => {

  const [form, setForm] = useState({ name: "", password: "" });
  const { login, setError, authState } = useAuth();
  const navigate = useNavigate();

  const handleInput = ({ target }) => {
    setError("");
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BACKEND_URL}/users/login`, { form })
      .then(({ data, status }) => {
        if (status === 204) {
          setError("Username/Password are not valid!");
        } else {
          const { name, token } = data;
          login(name, token);
          navigate('/list');
        }
      });
  }

  useEffect(() => {
    if (authState.isAuthenticated) navigate('/list');
  }, [authState.isAuthenticated, navigate])


  return (
    <form onSubmit={handleSubmit} className="login">
      <div className="login__img-container">
        <img src={loginImage}
          alt="logo" className='login__img-container--img' />
      </div>
      <div className='w-75 m-auto'>
        <p className='login__title'>Login</p>
        <label htmlFor="name">Username</label>
        <input
          className='w-100 mb-2'
          value={form.name}
          onChange={handleInput}
          name="name"
          id='name'
          type='text'
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className='w-100 mb-2'
          value={form.password}
          name="password"
          onChange={handleInput}
          type='password'
          id='password'
          required
        />
        <p className='text-danger'>{authState.error}</p>
        <input type="submit" className='submit-btn' value="Login" />
        <div className='d-flex flex-row mt-5'>
          <p className='me-2'>Don't you already have an account?</p>
          <NavLink to='/register'>Create an account!</NavLink>
        </div>
      </div>
    </form>
  );
}

export default Login;