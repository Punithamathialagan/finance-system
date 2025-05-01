import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/auth/register', form);
    navigate('/login');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="first_name" onChange={handleChange} placeholder="First Name" required />
      <input name="last_name" onChange={handleChange} placeholder="Last Name" required />
      <input name="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;