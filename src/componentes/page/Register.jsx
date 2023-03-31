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
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BACKEND_URL}/users/save`, { form })
      .then(({ data, status }) => {

        if (status === 204) {
          setError("Username already exists!");
        } else {
          navigate('/');
        }
      }
      );
  }

  return (
    <form onSubmit={handleSubmit} className="w-25 m-auto">
      <div className="text-center">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          style={{ width: '185px' }} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">Register in TODO List</h4>
      </div>
      <p>Register</p>
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
      <input type="submit" className='mb-4 w-100 bg-danger' value="Send" />
      <NavLink to='/'>Do you already have an account?</NavLink>
    </form>
  );
}

export default Register;