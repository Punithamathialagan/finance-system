import React, { useEffect, useState } from 'react';
import api from  '../services/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    category: '',
    type: 'income',
    amount: '',
    date: '',
    description: '',
  });

  const fetchTransactions = async () => {
    const res = await api.get('/transaction');
    setTransactions(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/transactions', form);
    setForm({ category: '', type: 'income', amount: '', date: '', description: '' });
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    await api.delete(/transactions/`${id}`);
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <form onSubmit={handleSubmit}>
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">Add Transaction</button>
      </form>

      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            {tx.date} - {tx.category} - {tx.type} - ₹{tx.amount}
            <button onClick={() => handleDelete(tx.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;