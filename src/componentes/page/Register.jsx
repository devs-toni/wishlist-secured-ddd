import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BACKEND_URL } from '../../helpers/config';

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
    await axios.post(`${BACKEND_URL}/users/save`, { form })
      .then(({ data, status }) => {
        navigate('/');
      }).catch((err) => {
        setError("Username already exists!");
      });
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <div className="login__img-container">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/task-management-4517376-3742807.png"
          alt="logo" className='login__img-container--img' />
      </div>
      <div className='w-75 m-auto'>
        <p className='login__title'>Register</p>
        <label htmlFor="password">Username</label>
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
        <input type="submit" className='submit-btn' value="Send" />
        <div className='d-flex flex-row mt-5 '>
          <p className='me-2' >Do you already have an account?</p>
          <NavLink to='/'>Login!</NavLink>
        </div>
      </div>
    </form>
  );
}

export default Register;