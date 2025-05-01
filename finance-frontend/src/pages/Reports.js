import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Reports = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const res = await api.get('/reports');
    setReports(res.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      <ul>
        {reports.map((r) => (
          <li key={r.id}>
            {r.month}: Income ₹{r.total_income}, Expense ₹{r.total_expense}, Savings ₹{r.savings}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;