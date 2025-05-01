import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({
    month: '',
    limit_amount: ''
  });

  const fetchBudgets = async () => {
    const res = await api.get('/budgets');
    setBudgets(res.data);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/budgets', form);
    setForm({ month: '', limit_amount: '' });
    fetchBudgets();
  };

  const handleDelete = async (id) => {
    await api.delete(/budgets/`${id}`);
    fetchBudgets();
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div>
      <h2>Budgets</h2>
      <form onSubmit={handleSubmit}>
        <input type="month" name="month" value={form.month} onChange={handleChange} required />
        <input type="number" name="limit_amount" value={form.limit_amount} onChange={handleChange} placeholder="Limit Amount" required />
        <button type="submit">Add Budget</button>
      </form>

      <ul>
        {budgets.map((b) => (
          <li key={b.id}>
            {b.month} - ₹{b.limit_amount}
            <button onClick={() => handleDelete(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budgets;