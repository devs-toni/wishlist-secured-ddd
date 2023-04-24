import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../.././context/AuthContext';
import { BACKEND_URL } from '../../../helpers/config';
import loginImage from '../../../assets/images/login.webp';

const Register = () => {

  const [form, setForm] = useState({ name: "", password: "" });
  const { setError, authState } = useAuth();
  const navigate = useNavigate();

  const handleInput = ({ target }) => {
    setError("");
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BACKEND_URL}/users`, { form })
      .then(({ status }) => {
        status === 200 ? navigate('/') : setError("Username already exists!");
      });
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <div className="login__img-container">
        <img src={loginImage}
          alt="logo" className='login__img-container--img' />
      </div>
      <div className='w-75 m-auto d-flex flex-column'>
        <p className='login__title'>Register</p>
        <label htmlFor="password" className='m-auto'>Username</label>
        <input
          className='w-50 mb-2 m-auto'
          value={form.name}
          onChange={handleInput}
          name="name"
          id='name'
          type='text'
          required
        />
        <label htmlFor="password" className='m-auto'>Password</label>
        <input
          className='w-50 mb-2 m-auto'
          value={form.password}
          name="password"
          onChange={handleInput}
          type='password'
          id='password'
          required
        />
        <p className='text-danger m-auto'>{authState.error}</p>
        <input type="submit" className='submit-btn m-auto' value="Send" />
        <div className='d-flex flex-row mt-5 m-auto'>
          <p className='me-2' >Do you already have an account?</p>
          <NavLink style={{ color: "#8a2be2" }} to='/'>Login!</NavLink>
        </div>
      </div>
    </form>
  );
}

export default Register;